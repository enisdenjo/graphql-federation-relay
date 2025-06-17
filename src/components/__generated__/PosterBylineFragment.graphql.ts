/**
 * @generated SignedSource<<4b21866f6f3efd6e1a4ea8a7fc3d6cb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PosterBylineFragment$data = {
  readonly name: string | null;
  readonly nodeId?: string;
  readonly profilePicture: {
    readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
  } | null;
  readonly " $fragmentType": "PosterBylineFragment";
};
export type PosterBylineFragment$key = {
  readonly " $data"?: PosterBylineFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PosterBylineFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "nodeId",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PosterBylineFragment",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Person",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Organization",
      "abstractKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "profilePicture",
      "plural": false,
      "selections": [
        {
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 60
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 60
            }
          ],
          "kind": "FragmentSpread",
          "name": "ImageFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Actor",
  "abstractKey": "__isActor"
};
})();

(node as any).hash = "3885158eef33be3ba9773b96e616329c";

export default node;
