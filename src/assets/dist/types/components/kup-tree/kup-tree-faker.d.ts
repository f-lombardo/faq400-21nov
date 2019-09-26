import { Column } from "./../kup-data-table/kup-data-table-declarations";
import { TreeNode, TreeNodePath } from "./kup-tree-declarations";
interface TreeRndNodeGetter {
    selectedTreeNode: TreeNode | null;
    treeNodePath: TreeNodePath | null;
}
export interface FactoryTreeNodeOptions {
    minimumChildCount: number;
    propagate?: boolean;
}
export interface FactoryTreeOptions {
    forceColumnVisibility: boolean;
}
export interface DynamicExpansionFakerOptions {
    useDelay?: number;
}
export interface TreeConfigData {
    columns: Column[];
    data: TreeNode[];
}
export declare function getRandomInteger(maximum?: number): number;
export declare function getTreeNodeFromPath(treeNodes: TreeNode[], path: TreeNodePath): TreeNode | null;
export declare function flattenTree(nodesToFlatten: TreeNode[], useIsExpandedFlag?: boolean): TreeNode[];
export declare function getRndTreeNode(currentDepthTreeElements: TreeNode[], treeDepth: number): TreeRndNodeGetter;
/**
 * Function returning the columns and the data to create and initialize a kup-tree component.
 * @param treeDepth - How many subtree a tree can have.
 * @param columnCount - How many columns the columns field must generate.
 * @param options - Generic options
 * @param treeOptions - Options bag to pass to the treeNodeFactory
 * @returns {{columns: array, data: object}}*
 */
export declare function TreeFactory(treeDepth?: number, columnCount?: number, options?: FactoryTreeOptions, treeOptions?: FactoryTreeNodeOptions): TreeConfigData;
/**
 * Function mocking a DynamicallyExpandable tree.
 * @param treeDepth - How many subtree a tree can have.
 * @param columnCount - How many columns the columns field must generate.
 * @param options - Generic options bag
 * @param options.tree - Options bag to pass to the TreeFactory
 * @param options.treeNode - Options bag to pass to the TreeNodeFactory
 * @param [options.dynamicExpansion] - Options bag to pass to the DynamicExpansionFaker
 * @returns {{columns: array, data: object}}*
 */
export declare function DynamicExpansionFaker(treeDepth?: number, columnCount?: number, options?: {
    tree: FactoryTreeOptions;
    treeNode: FactoryTreeNodeOptions;
    dynamicExpansion?: DynamicExpansionFakerOptions;
}): {
    data: TreeNode[];
    columns: Column[];
    getTreeNodeChildren(nodePath?: number[]): Promise<unknown>;
    treeDataSource: TreeConfigData;
};
export {};
