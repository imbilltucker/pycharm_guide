/*

A HoC to extract content from outside world, mainly references and
flattening.

 */

import { parse } from 'qs';
import * as React from 'react';

import { IAuthorEdge, IAuthorEdges } from '../authors/models';
import { IBaseResourceEdges, IBaseResourceNode } from '../base_models';
import { IPlaylistEdges } from '../playlists/models';
import { ITipNode } from './models';

export interface ITipWrapperProps {
  location: {
    search: string;
  };
  data: {
    tip: ITipNode;
    authors: { edges: IAuthorEdges };
    resources: {
      edges: IBaseResourceEdges;
    };
    playlists: {
      edges: IPlaylistEdges;
    };
  };
}

const TipWrapper = (Component: any) => ({ data: { tip, authors, resources, playlists }, location }: ITipWrapperProps) => {
  const search = location.search ? parse(location.search.substring(1)) : null;
  const playlistLabel = search ? search.playlist : null;

  const tipNode = {
    ...tip.frontmatter,
    slug: tip.fields.slug,
    excerpt: tip.excerpt,
    html: tip.html
  };

  // Flatten the author
  const authorEdge: IAuthorEdge | undefined = authors.edges.find(edge => edge.node.frontmatter.label === tip.frontmatter.author);
  const author = authorEdge
    ? {
        ...authorEdge.node.frontmatter,
        slug: authorEdge.node.fields.slug
      }
    : undefined;

  // PLAYLISTS

  // We need all the playlists that this item (e.g. Tip) occurs in. If
  // this item doesn't appear in any playlists, show the item standalone.
  const appearingPlaylists = playlists.edges.filter(edge => edge.node.frontmatter.items.includes(tip.fields.slug));

  // Choose a playlist to show this item in.
  // - If the query string has a playlist, use that
  // - Otherwise, get the first playlist this item appears in

  // If we have a playlist label from the query string or cookie,
  // grab the playlist and dereference its items
  const playlistEdge = playlistLabel
    ? playlists.edges.find(resource => {
        const fm = resource.node.frontmatter;
        return fm.label === playlistLabel;
      })
    : appearingPlaylists[0];

  if (playlistEdge) {
    // Make a mapping of all resources, slug -> resource
    const allResources: { [s: string]: IBaseResourceNode } = {};
    resources.edges.map(edge => (allResources[edge.node.fields.slug] = edge.node));

    // Flatten the playlist steps
    const playlistNode = playlistEdge.node;
    const playlistItems = playlistNode.frontmatter.items.map(itemSlug => allResources[itemSlug]);

    // Return constructed wrapped component
    return (
      <Component
        resource={tipNode}
        author={author}
        playlist={playlistNode}
        playlistItems={playlistItems}
        appearingPlaylists={appearingPlaylists}
      />
    );
  }

  return <Component resource={tipNode} author={author} />;
};

export default TipWrapper;
