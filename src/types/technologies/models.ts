import { IBaseCategoryFrontmatter, IBaseCategoryNode } from '../base_models';

export interface ITechnologyFrontmatter extends IBaseCategoryFrontmatter {
  logo: {
    publicURL: string;
  };
  website: string;
}

export interface ITechnologyNode extends IBaseCategoryNode {
  frontmatter: ITechnologyFrontmatter;
}

export interface ITechnologyEdge {
  node: ITechnologyNode;
}

export type ITechnologyEdges = ITechnologyEdge[];
