import { describe, expect, test } from 'vitest';
import findSubset, { Node } from '../src/FindSubset';

describe('FindSubset', () => {

    //        A1           Answer:      A1
    //      / | \                      /  \
    //    B1  D1 C1                   B1   C1
    //   /  \      \                 /
    //  A2   B2     B3              A2
    test('Test Case 1', () => {
        const nodeA1:Node = {id: "a1", type: "A"};
        const nodeA2:Node = {id: "a2", type: "A"};
        const nodeB1:Node = {id: "b1", type: "B"};
        const nodeB2:Node = {id: "b2", type: "B"};
        const nodeB3:Node = {id: "b3", type: "B"};
        const nodeC1:Node = {id: "c1", type: "C"};
        const nodeD1:Node = {id: "d1", type: "D"};

        nodeA1.adjacent = [nodeB1, nodeD1, nodeC1];
        nodeB1.adjacent = [nodeA2, nodeB2];
        nodeC1.adjacent = [nodeB3];

        const result = findSubset(nodeA1, ["A", "A", "B", "C"])

        expect(result).toEqual([nodeA1, nodeB1, nodeC1, nodeA2]);
    });

    //      A1              Answer(s):        A1            A1         A1         the first solution is preferred
    //     /  \                              / \           /            \         as it is most shallow
    //    B1   B2                           B1  B2        B1             B2
    //   /  \    \                         /             / \              \
    //  A2   B3   B4                      A2           A2   B3             B4
    //              \                                                       \
    //               A3                                                      A3
    test('Test Case 2', () => {
        const nodeA1:Node = {id: "a1", type: "A"};
        const nodeA2:Node = {id: "a2", type: "A"};
        const nodeA3:Node = {id: "a3", type: "A"};
        const nodeB1:Node = {id: "b1", type: "B"};
        const nodeB2:Node = {id: "b2", type: "B"};
        const nodeB3:Node = {id: "b3", type: "B"};
        const nodeB4:Node = {id: "b4", type: "B"};

        nodeA1.adjacent = [nodeB1, nodeB2];
        nodeB1.adjacent = [nodeA2, nodeB3];
        nodeB2.adjacent = [nodeB4];
        nodeB4.adjacent = [nodeA3];

        const result = findSubset(nodeA1, ["A", "B", "B", "A"])

        expect(result).toEqual([nodeA1, nodeB1, nodeB2, nodeA2]);
    });

    //      A1               Answer: Not possible as only one B can be matched
    //     /  \
    //    B1   B2
    //   /       \
    //  A2        C1
    test('Test Case 3', () => {
        const nodeA1:Node = {id: "a1", type: "A"};
        const nodeA2:Node = {id: "a2", type: "A"};
        const nodeB1:Node = {id: "b1", type: "B"};
        const nodeB2:Node = {id: "b2", type: "B"};
        const nodeC1:Node = {id: "c1", type: "C"};

        nodeA1.adjacent = [nodeB1, nodeB2];
        nodeB1.adjacent = [nodeA2];
        nodeB2.adjacent = [nodeC1];

        const result = findSubset(nodeA1, ["A", "A", "B", "C"])

        expect(result).to.be.null;
    });

    //     A1               Answer: Not possible as the root 'A' is not in the set
    //    /  \
    //   B1   B2
    test('Test Case 4', () => {
        const nodeA1:Node = {id: "a1", type: "A"};
        const nodeB1:Node = {id: "b1", type: "B"};
        const nodeB2:Node = {id: "b2", type: "B"};

        nodeA1.adjacent = [nodeB1, nodeB2];

        const result = findSubset(nodeA1, ["B", "B"])

        expect(result).to.be.null;
    });
});
