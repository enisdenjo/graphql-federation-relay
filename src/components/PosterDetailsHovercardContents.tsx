import * as React from "react";
import { useLazyLoadQuery, useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";

import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";

const PosterDetailsHovercardContentsQuery = graphql`
  query PosterDetailsHovercardContentsQuery($posterNodeId: ID!) {
    node(nodeId: $posterNodeId) {
      ... on Actor {
        ...PosterDetailsHovercardContentsBodyFragment
      }
    }
  }
`;

export default function PosterDetailsHovercardContents({
  posterNodeId,
}: {
  posterNodeId: string;
}): React.ReactElement {
  const data = useLazyLoadQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    { posterNodeId }
  );
  return <PosterDetailsHovercardContentsBody poster={data.node} />;
}

const PosterDetailsHovercardContentsBodyFragment = graphql`
  fragment PosterDetailsHovercardContentsBodyFragment on Actor {
    id
    name
    joined
    profilePicture {
      ...ImageFragment
    }
  }
`;

function PosterDetailsHovercardContentsBody({
  poster,
}: {
  poster: PosterDetailsHovercardContentsBodyFragment$key;
}) {
  const data = useFragment(PosterDetailsHovercardContentsBodyFragment, poster);
  return (
    <>
      <Image image={data.profilePicture} className="posterHovercard__image" />
      <div className="posterHovercard__name">{data.name}</div>
      <ul className="posterHovercard__details">
        <li>
          Joined <Timestamp time={data.joined} />
        </li>
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
