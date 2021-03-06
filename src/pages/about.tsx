import * as React from 'react';
import BaseLayout from '../layouts/BaseLayout';

const AboutPage: React.FunctionComponent = () => (
  <BaseLayout title="About the Guide">
    <div className="container content" style={{ marginTop: '2rem' }}>
      <div className="columns is-mobile">
        <div className="column is-three-quarters-desktop">
          <h1>Welcome to the PyCharm Guide</h1>
          <p>
            The PyCharm Guide collects lots of PyCharm resources -- blog posts, videos, tip tweets, articles, and more -- from inside and
            outside of JetBrains, into a convenient, interlinked, attractive site.
          </p>

          <article className="message is-info">
            <div className="message-header">
              <p>Note</p>
            </div>
            <div className="message-body">
              The Guide is still in "soft launch", used only for tips. We're not yet explaining how to contribute. Both of these are coming
              near the end of the year.
            </div>
          </article>

          <h2>Why The Guide?</h2>
          <p>Lots of resources, why another?</p>
          <ul>
            <li>Rich, valuable content showcasing how our IDE gets you into the “flow"</li>
            <li>Organization and linking which helps you find one thing then browse to related things</li>
            <li>Open content you can engage on GitHub</li>
            <li>
              Content the way people want it: tell me the “why”, working code, lots of hyperlinks, editorial process, consistent, visual,
              different flavors of videos (snippet, full with audio)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </BaseLayout>
);

export default AboutPage;
