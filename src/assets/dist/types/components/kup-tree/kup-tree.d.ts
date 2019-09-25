import { EventEmitter, JSX } from '../../stencil.core';
import { Cell, Column } from "./../kup-data-table/kup-data-table-declarations";
import { TreeNode, TreeNodePath } from "./kup-tree-declarations";
export declare class KupTree {
    /**
     * The columns of the tree when tree visualization is active
     */
    columns?: Column[];
    /**
     * The json data used to populate the tree view: the basic, always visible tree nodes.
     */
    data: TreeNode[];
    /**
     * Flag: the nodes of the whole tree must be already expanded upon loading. Disabled nodes do NOT get expanded.
     */
    expanded: boolean;
    /**
     * Shows the tree data as a table.
     */
    showColumns: boolean;
    /**
     * Flag: shows the header of the tree when the tree is displayed as a table.
     * @see showColumns
     */
    showHeader: boolean;
    /**
     * Show the icons of the various nodes of the tree.
     */
    showIcons: boolean;
    /**
     * An array of integers containing the path to a selected child.\
     * Groups up the properties SelFirst, SelItem, SelName.
     */
    selectedNode: TreeNodePath;
    /**
     * When a node has options in its data and is on mouse over state while this prop is true,
     * the node must shows the cog wheel to trigger object navigation upon click.
     *
     * This will generate an event to inform the navigation object has been activated.
     */
    showObjectNavigation: boolean;
    /**
     * When the component must use the dynamic expansion feature to open its nodes, it means that not all the nodes of the
     * tree have been passed inside the data property.
     *
     * Therefore, when expanding a node, the tree must emit an event (or run a given callback)
     * and wait for the child nodes to be downloaded from the server.
     *
     * For more information:
     * @see dynamicExpansionCallback
     */
    useDynamicExpansion: boolean;
    /**
     * Function that gets invoked when a new set of nodes must be loaded as children of a node.
     * Used in combination with showObjectNavigation.
     *
     * When useDynamicExpansion is set, the tree component will have two different behaviors depending on the value of this prop.
     * 1 - If this prop is set to null, no callback to download data is available:
     *    the component will emit an event requiring the parent to load the children of the given node.
     * 2 - If this prop is set to have a callback, then the component will automatically make requests to load children of
     *    a given node. After the load has been completed, a different event will be fired to alert the parent of the change.
     *
     * @see useDynamicExpansion
     */
    dynamicExpansionCallback: (treeNodeToExpand: TreeNode, treeNodePath: TreeNodePath) => Promise<TreeNode[]> | undefined;
    /**
     * Nodes of the tree are draggable and can be sorted.
     * Currently this feature is not available.
     */
    visibleColumns: Column[];
    selectedNodeString: string;
    stateSwitcher: boolean;
    /**
     * When a cell option is clicked.
     * If the cell option is the one of the TreeNodeCell,
     * then column will be set to the fixed value {name: "TreeNodeCell", title: "TreeNodeCell"}.
     */
    kupOptionClicked: EventEmitter<{
        cell: Cell;
        column: Column;
        treeNode: TreeNode;
    }>;
    /**
     * Fired when a TreeNode gets collapsed (closed).
     */
    kupTreeNodeCollapse: EventEmitter<{
        treeNodePath: TreeNodePath;
        treeNode: TreeNode;
    }>;
    /**
     * Fired when a node expansion ion has been triggered.
     * Contains additional data when the tree is using the dynamicExpansion feature.
     * @event kupTreeNodeExpand
     * @type {object}
     * @property {TreeNodePath} treeNodePath - The array of indexes to retrieve the current treeNode inside the data prop.
     * @property {TreeNode} treeNode - Reference to the TreeNode data object which is being expanded (passed through the data prop).
     * @property {boolean} usesDynamicExpansion - Flag to notify that the component is running in dynamicExpansion mode.
     * @property {boolean} dynamicExpansionRequireChildren - Flag to notify that the current dynamicExpansion event
     *  requires the parent component to add TreeNode children to the given TreeNode.
     * @see useDynamicExpansion
     * @see dynamicExpansionCallback
     * @since 1.0.0
     */
    kupTreeNodeExpand: EventEmitter<{
        treeNodePath: TreeNodePath;
        treeNode: TreeNode;
        usesDynamicExpansion?: boolean;
        dynamicExpansionRequireChildren?: boolean;
    }>;
    /**
     * Fired when a node of the tree has been selected
     */
    kupTreeNodeSelected: EventEmitter<{
        treeNodePath: TreeNodePath;
        treeNode: TreeNode;
    }>;
    componentWillLoad(): void;
    enrichDataWhenChanged(newData: any, oldData: any): void;
    selectedNodeToStr(newData: any): void;
    enrichWithIsExpanded(treeNode: TreeNode, expandNode?: boolean): void;
    /**
     * Forces component update with a simple trick.
     * Should be avoided if possible.
     * Thinking about a more clean and functional solution.
     *
     * A possible idea on where to store the expanded flag could be the following:
     * 1. generate an unique id for each tree instance and add a common prefix to it (something like 'kupTree${uniqueId}');
     * 2. store that new string and use it as a key to access the flag for showing if that TreeNode is expanded or not.
     * However there is a problem with this approach.
     * When the necessity of recreating the state of the components after browsing another page away will arise,
     * the fact that each time a new id is generated will make the previously used id invalid and the whole tree will be rendered with its initial state.
     * The only solution to this is to add a prop which will allow the user of the component to pass an id to be used as
     * index for storing and retrieving the expanded state of the current node.
     * Also, when the component will be destroyed, it should emit an event containing the above discussed key to be stored.
     *
     * @todo Find a better way to achieve this. And maybe also where to store the expanded flag.
     * @author Francesco Bonacini f.bonacini@dreamonkey.com
     */
    forceUpdate(): void;
    hdlTreeNodeClicked(treeNodeData: TreeNode, treeNodePath: string): void;
    hdlTreeNodeExpanderClicked(treeNodeData: TreeNode, treeNodePath: string): void;
    hdlOptionClicked(e: UIEvent, cell: Cell, column: Column, treeNode: TreeNode): void;
    /**
     * Given a nodePath, transform that array into
     * @param nodePath
     */
    selectedNodeToString(nodePath: TreeNodePath): string;
    renderOptionElement(cell: Cell, column: Column, treeNode: TreeNode): any;
    /**
     * Factory function for cells.
     * @param cell - cell object
     * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
     * @param cellData - Additional data for the current cell.
     * @param cellData.column - The column object to which the cell belongs.
     * @param cellData.row - The row object to which the cell belongs.
     */
    renderCell(cell: Cell, cellData: {
        column: Column;
        treeNode: TreeNode;
    }, previousRowCellValue?: string): any;
    /**
     * Renders the header of the tree when it must be displayed as a table.
     * @returns An array of table header cells.
     */
    renderHeader(): JSX.Element[];
    /**
     * Given a TreeNode, reads through its data then composes and returns its JSX object.
     * @param treeNodeData - The TreeNode object to parse.
     * @param treeNodePath - A string containing the comma(,) separated indexes of the TreeNodes to use,
     *    sorted from left to right, to access the current TreeNode starting from the data prop children object.
     * @param treeNodeDepth - An integer to keep track of the depth level of the current TreeNode. Used for indentation.
     * @returns The the JSX created from the current tree node.
     */
    renderTreeNode(treeNodeData: TreeNode, treeNodePath: string, treeNodeDepth?: number): JSX.Element;
    /**
     * Given a TreeNode, reads through its data to compose and return the TreeNodes of the root of this TreeNode
     * and its children nodes, composing an array of JSX TreeNodes.
     * @param treeNodeData - The TreeNode object to parse.
     * @param treeNodePath - A string containing the comma(,) separated indexes of the TreeNodes to use,
     *    sorted from left to right, to access the current TreeNode starting from the data prop children object.
     * @param treeNodeDepth - An integer to keep track of the depth level of the current TreeNode. Used for indentation.
     * @returns An array of JSX TreeNodes created from the given treeNodeData.
     */
    renderTree(treeNodeData: TreeNode, treeNodePath: string, treeNodeDepth?: number): JSX.Element[];
    render(): any[];
}
