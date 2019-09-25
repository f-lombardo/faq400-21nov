import { r as registerInstance, c as createEvent, h } from './chunk-1851c479.js';
import './chunk-d8060b98.js';
import { i as isIcon, b as isVoCodver, e as isImage, h as isLink, j as isCheckbox, m as isBar, q as styleHasBorderRadius } from './chunk-6abc1eda.js';
/**
 * The name of the property used by the tree component to store whether a TreeNode is open or closed
 * @constant
 */
var treeExpandedPropName = 'isExpanded';
/*import {
  ComboItem,
  ComboPosition,
  KetchupComboEvent,
} from './kup-combo-declarations';
import { eventFromElement } from '../../utils/utils';
import { getElementOffset } from '../../utils/offset';
import { GenericObject } from '../../types/GenericTypes';
*/
var KupTree = /** @class */ (function () {
    function KupTree(hostRef) {
        registerInstance(this, hostRef);
        /**
         * The json data used to populate the tree view: the basic, always visible tree nodes.
         */
        this.data = [];
        /**
         * Flag: the nodes of the whole tree must be already expanded upon loading. Disabled nodes do NOT get expanded.
         */
        this.expanded = false;
        /**
         * Shows the tree data as a table.
         */
        this.showColumns = false;
        /**
         * Flag: shows the header of the tree when the tree is displayed as a table.
         * @see showColumns
         */
        this.showHeader = false;
        /**
         * Show the icons of the various nodes of the tree.
         */
        this.showIcons = true;
        /**
         * An array of integers containing the path to a selected child.\
         * Groups up the properties SelFirst, SelItem, SelName.
         */
        this.selectedNode = [];
        /**
         * When a node has options in its data and is on mouse over state while this prop is true,
         * the node must shows the cog wheel to trigger object navigation upon click.
         *
         * This will generate an event to inform the navigation object has been activated.
         */
        this.showObjectNavigation = false;
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
        this.useDynamicExpansion = false;
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
        this.dynamicExpansionCallback = undefined;
        /**
         * Nodes of the tree are draggable and can be sorted.
         * Currently this feature is not available.
         */
        // @Prop() draggableNodes: boolean = false;
        //-------- State --------
        this.visibleColumns = [];
        this.selectedNodeString = '';
        this.stateSwitcher = false;
        this.kupOptionClicked = createEvent(this, "kupOptionClicked", 6);
        this.kupTreeNodeCollapse = createEvent(this, "kupTreeNodeCollapse", 6);
        this.kupTreeNodeExpand = createEvent(this, "kupTreeNodeExpand", 6);
        this.kupTreeNodeSelected = createEvent(this, "kupTreeNodeSelected", 6);
    }
    //-------- Lifecycle hooks --------
    KupTree.prototype.componentWillLoad = function () {
        var _this = this;
        if (this.data) {
            // When the nodes must be expanded upon loading and the tree is not using a dynamicExpansion (and the current TreeNode is not disabled)
            // the default value of the treeExpandedPropName is set to true
            this.data.forEach(function (rootNode) { _this.enrichWithIsExpanded(rootNode, _this.expanded && !_this.useDynamicExpansion && !rootNode.disabled); });
        }
        // Initializes the selectedNodeString
        if (Array.isArray(this.selectedNode)) {
            this.selectedNodeString = this.selectedNode.toString();
        }
    };
    //-------- Watchers --------
    KupTree.prototype.enrichDataWhenChanged = function (newData, oldData) {
        var _this = this;
        if (newData !== oldData) {
            newData.forEach(function (rootNode) { _this.enrichWithIsExpanded(rootNode, _this.expanded && !_this.useDynamicExpansion && !rootNode.disabled); });
        }
    };
    KupTree.prototype.selectedNodeToStr = function (newData) {
        if (Array.isArray(newData)) {
            this.selectedNodeString = newData.toString();
        }
    };
    //-------- Methods --------
    KupTree.prototype.enrichWithIsExpanded = function (treeNode, expandNode) {
        if (expandNode === void 0) { expandNode = false; }
        // The node is expandable, which means there are sub trees
        if (treeNode.expandable) {
            // If the node does not already have the property to toggle expansion we add it
            // Notice how, if the property is already set, its first value will be the same value that was provided by the object itself
            // and only if the node must be expanded automatically then [treeExpandedPropName] is set to true forcibly.
            // This is done to allow a TreeNode to force its [treeExpandedPropName] to true so that specific nodes can be already set to open.
            treeNode[treeExpandedPropName] = treeNode.hasOwnProperty(treeExpandedPropName) ? (treeNode[treeExpandedPropName] || expandNode) : expandNode;
            // Enriches also direct subtrees recursively (if it has children)
            if (treeNode.children && treeNode.children.length) {
                // To save some function calls, only child elements which are expandable will be enriched
                for (var i = 0; i < treeNode.children.length; i++) {
                    if (treeNode.children[i].expandable) {
                        this.enrichWithIsExpanded(treeNode.children[i], expandNode && !(treeNode.children[i].disabled));
                    }
                }
            }
        }
    };
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
    KupTree.prototype.forceUpdate = function () {
        this.stateSwitcher = !this.stateSwitcher;
    };
    // When a TreeNode can be selected
    KupTree.prototype.hdlTreeNodeClicked = function (treeNodeData, treeNodePath) {
        // If this TreeNode is not disabled, then it can be selected and an event is emitted
        if (!treeNodeData.disabled) {
            this.kupTreeNodeSelected.emit({
                treeNodePath: treeNodePath.split(',').map(function (treeNodeIndex) { return parseInt(treeNodeIndex); }),
                treeNode: treeNodeData
            });
        }
    };
    // When a TreeNode must be expanded or closed.
    KupTree.prototype.hdlTreeNodeExpanderClicked = function (treeNodeData, treeNodePath) {
        var _this = this;
        // If the node is expandable
        if (treeNodeData.expandable) {
            // Always composes the tree node path as an array
            var arrayTreeNodePath_1 = treeNodePath.split(',').map(function (index) { return parseInt(index); });
            // There are already children set in this TreeNode -> expand or collapse node and emit appropriate event
            if (treeNodeData.children && treeNodeData.children.length) {
                // Updates expanded state and force rerender
                treeNodeData[treeExpandedPropName] = !treeNodeData[treeExpandedPropName];
                this.forceUpdate();
                if (treeNodeData[treeExpandedPropName]) {
                    // TreeNode is now expanded -> Fires expanded event
                    this.kupTreeNodeExpand.emit({
                        treeNodePath: arrayTreeNodePath_1,
                        treeNode: treeNodeData,
                        usesDynamicExpansion: this.useDynamicExpansion,
                    });
                }
                else {
                    // TreeNode is now collapsed -> Fires collapsed event
                    this.kupTreeNodeCollapse.emit({
                        treeNodePath: arrayTreeNodePath_1,
                        treeNode: treeNodeData,
                    });
                }
            }
            else if (this.useDynamicExpansion && !this.expanded) {
                // When the component must use the dynamic expansion feature
                // Currently it does not support the expanded prop
                // Checks if we have a dynamicExpansionCallback or not
                if (this.dynamicExpansionCallback) {
                    // We have a callback: invokes it and after the result is returned updates the tree
                    this.dynamicExpansionCallback(treeNodeData, arrayTreeNodePath_1)
                        .then(function (childrenTreeNodes) {
                        // Children returned successfully
                        treeNodeData.children = childrenTreeNodes;
                        treeNodeData[treeExpandedPropName] = !treeNodeData[treeExpandedPropName];
                        _this.forceUpdate();
                        // TreeNode is now expanded -> Fires expanded event
                        _this.kupTreeNodeExpand.emit({
                            treeNodePath: arrayTreeNodePath_1,
                            treeNode: treeNodeData,
                            usesDynamicExpansion: true,
                        });
                    })
                        .catch(function (err) {
                        console.error("KupTree: An error occurred when trying to fetch dynamicExpansion nodes data", err, treeNodeData);
                    });
                }
                else {
                    // we do NOT have a callback set.
                    // Fires the expand request for the given TreeNode and set the appropriate flag
                    this.kupTreeNodeExpand.emit({
                        treeNode: treeNodeData,
                        treeNodePath: arrayTreeNodePath_1,
                        usesDynamicExpansion: true,
                        dynamicExpansionRequireChildren: true,
                    });
                    // TODO remove these comments if this behavior will be accepted
                    // Sets the flag for setting the TreeNode as opened, but does not force rerender,
                    // to allow application to execute the update of the tree
                    // treeNodeData[treeExpandedPropName] = !treeNodeData[treeExpandedPropName];
                }
            }
        }
    };
    // Handler for clicking onto the cells option object
    KupTree.prototype.hdlOptionClicked = function (e, cell, column, treeNode) {
        // We block propagation of this event to prevent tree node from being expanded or close.
        e.stopPropagation();
        // Emits custom event
        this.kupOptionClicked.emit({
            cell: cell,
            column: column,
            treeNode: treeNode,
        });
    };
    /**
     * Given a nodePath, transform that array into
     * @param nodePath
     */
    KupTree.prototype.selectedNodeToString = function (nodePath) {
        var strToRet = "";
        if (nodePath && nodePath.length) {
            strToRet = nodePath[0].toString();
            for (var i = 1; i < nodePath.length; i++) {
                strToRet += "," + nodePath[0];
            }
        }
        return strToRet;
    };
    //-------- Rendering --------
    KupTree.prototype.renderOptionElement = function (cell, column, treeNode) {
        var _this = this;
        return (h("span", { "aria-label": "Opzioni oggetto", class: "options mdi mdi-settings", role: "button", title: "Opzioni oggetto", onClick: function (e) { return _this.hdlOptionClicked(e, cell, column, treeNode); } }));
    };
    /**
     * Factory function for cells.
     * @param cell - cell object
     * @param previousRowCellValue - An optional value of the previous cell on the same column. If set and equal to the value of the current cell, makes the value of the current cell go blank.
     * @param cellData - Additional data for the current cell.
     * @param cellData.column - The column object to which the cell belongs.
     * @param cellData.row - The row object to which the cell belongs.
     */
    KupTree.prototype.renderCell = function (cell, cellData, previousRowCellValue) {
        // TODO missing a piece to create a complete rendering of a cell @see kup-data-table row 1145 (basically missing style={cellStyle} class={cellClass})
        // When the previous row value is different from the current value, we can show the current value.
        var valueToDisplay = previousRowCellValue !== cell.value ? cell.value : '';
        // Sets the default value
        var content = valueToDisplay;
        if (isIcon(cell.obj) || isVoCodver(cell.obj)) {
            content = h("span", { class: valueToDisplay });
        }
        else if (isImage(cell.obj)) {
            content = (h("img", { src: valueToDisplay, alt: "", width: "64", height: "64" }));
        }
        else if (isLink(cell.obj)) {
            content = (h("a", { href: valueToDisplay, target: "_blank" }, valueToDisplay));
        }
        else if (isCheckbox(cell.obj)) {
            // A tree currently is not editable. Checkbox are always disabled.
            content = (h("kup-checkbox", { checked: !!cell.obj.k, disabled: cellData.treeNode.hasOwnProperty('readOnly') ? cellData.treeNode.readOnly : true }));
        }
        else if (isBar(cell.obj)) {
            // KupTree cannot have the tree columns resized.
            // This constant keeps the possible width type to keep a certain degree of compatibility with kup-data-table,
            // From which this type of content was taken
            var props = {
                value: cell.value,
            };
            // Controls if we should display this cell value
            content = valueToDisplay ? h("kup-graphic-cell", Object.assign({}, props)) : null;
        }
        // TODO add this once the progressbar has been implemented among the graphics forms.
        // else if (isProgressBar(cell.obj)) {
        //     content = <kup-progress-bar />;
        // }
        // Elements of the cell
        var cellElements = [];
        cellElements.push(h("span", { class: "cell-content", style: styleHasBorderRadius(cell) ? cell.style : null }, content));
        /**
         * Renders option object if necessary.
         *
         * Currently to align it on the right side of the cell, it uses the CSS float property.
         * This can lead to some rendering errors.
         * See [this page]{@link https://www.w3schools.com/cssref/pr_class_float.asp} for more details.
         * If this case happens, then the solution is to wrap the content returned by this function into an element with
         * display flex, to use its content property.
         *
         * @namespace KupTree.renderCellOption
         */
        if (!cellData.treeNode.disabled && cell.options && this.showObjectNavigation) {
            cellElements.push(this.renderOptionElement(cell, cellData.column, cellData.treeNode));
        }
        return h("td", { style: !styleHasBorderRadius(cell) ? cell.style : null }, cellElements);
    };
    /**
     * Renders the header of the tree when it must be displayed as a table.
     * @returns An array of table header cells.
     */
    KupTree.prototype.renderHeader = function () {
        return this.visibleColumns.map(function (column) { return h("th", null, h("span", { class: "column-title" }, column.title)); });
    };
    /**
     * Given a TreeNode, reads through its data then composes and returns its JSX object.
     * @param treeNodeData - The TreeNode object to parse.
     * @param treeNodePath - A string containing the comma(,) separated indexes of the TreeNodes to use,
     *    sorted from left to right, to access the current TreeNode starting from the data prop children object.
     * @param treeNodeDepth - An integer to keep track of the depth level of the current TreeNode. Used for indentation.
     * @returns The the JSX created from the current tree node.
     */
    KupTree.prototype.renderTreeNode = function (treeNodeData, treeNodePath, treeNodeDepth) {
        var _a;
        var _this = this;
        if (treeNodeDepth === void 0) { treeNodeDepth = 0; }
        // Creates the indentation of the current element. Use a css variable to specify padding.
        var indent = treeNodeDepth
            ? h("span", { class: "kup-tree__indent", style: (_a = {}, _a["--tree-node_depth"] = treeNodeDepth.toString(), _a) })
            : null;
        // If the tree node is expandable, adds the icon to show the expansion.
        // If expandable, also add the callback on the click action.
        // If it is not expandable, we simply add a placeholder with no icons.
        var hasExpandIcon = !!(treeNodeData.expandable && ((treeNodeData.children && treeNodeData.children.length) || this.useDynamicExpansion));
        var treeExpandIcon = h("span", { class: "kup-tree__icon kup-tree__node__expander" + (hasExpandIcon ? " mdi mdi-menu-down" : ""), onClick: hasExpandIcon && !treeNodeData.disabled ? function () { return _this.hdlTreeNodeExpanderClicked(treeNodeData, treeNodePath); } : null });
        // When TreeNode icons are visible, creates the icon if one is specified
        var treeNodeIcon = this.showIcons ? h("span", { class: "kup-tree__icon mdi mdi-" + treeNodeData.iconClass }) : null;
        // Composes additional options for the tree node element
        var treeNodeOptions = {};
        if (treeNodeData.hasOwnProperty(treeExpandedPropName) && treeNodeData[treeExpandedPropName] && hasExpandIcon) {
            // If the node is expanded it has this attribute set to if this node is expanded or not.
            treeNodeOptions['data-is-expanded'] = treeNodeData[treeExpandedPropName];
        }
        // When can be expanded OR selected OR have option handler
        var treeNodeOptionIcon = null;
        if (!treeNodeData.disabled) {
            treeNodeOptions['onClick'] = function () {
                _this.hdlTreeNodeClicked(treeNodeData, treeNodePath);
            };
            // Controls if there is the necessity to print out options also for the TreeNodeCell
            if (treeNodeData.options && this.showObjectNavigation) {
                treeNodeOptionIcon = this.renderOptionElement({
                    obj: treeNodeData.obj,
                    value: treeNodeData.value,
                }, 
                // TODO for now creates a fictitious column standard for all TreeNodeCell
                {
                    name: 'TreeNodeCell',
                    title: 'TreeNodeCell'
                }, treeNodeData);
            }
        }
        // When a tree node is displayed as a table
        var treeNodeCells = null;
        if (this.showColumns && this.visibleColumns && this.visibleColumns.length) {
            treeNodeCells = [];
            // Renders all the cells
            for (var j = 0; j < this.visibleColumns.length; j++) {
                var column = this.visibleColumns[j];
                treeNodeCells.push(this.renderCell(treeNodeData.cells[column.name], {
                    column: column,
                    treeNode: treeNodeData
                }));
            }
        }
        return (h("tr", Object.assign({ class: {
                "kup-tree__node": true,
                "kup-tree__node--disabled": treeNodeData.disabled,
                "kup-tree__node--selected": !treeNodeData.disabled && treeNodePath === this.selectedNodeString,
            }, "data-tree-path": treeNodePath }, treeNodeOptions), h("td", { style: treeNodeData.style || null }, indent, treeExpandIcon, treeNodeIcon, h("span", { class: "cell-content" }, treeNodeData.value), treeNodeOptionIcon), treeNodeCells));
    };
    /**
     * Given a TreeNode, reads through its data to compose and return the TreeNodes of the root of this TreeNode
     * and its children nodes, composing an array of JSX TreeNodes.
     * @param treeNodeData - The TreeNode object to parse.
     * @param treeNodePath - A string containing the comma(,) separated indexes of the TreeNodes to use,
     *    sorted from left to right, to access the current TreeNode starting from the data prop children object.
     * @param treeNodeDepth - An integer to keep track of the depth level of the current TreeNode. Used for indentation.
     * @returns An array of JSX TreeNodes created from the given treeNodeData.
     */
    KupTree.prototype.renderTree = function (treeNodeData, treeNodePath, treeNodeDepth) {
        if (treeNodeDepth === void 0) { treeNodeDepth = 0; }
        var treeNodes = [];
        if (treeNodeData) {
            // Creates and adds the root of the current tree
            treeNodes.push(this.renderTreeNode(treeNodeData, treeNodePath, treeNodeDepth));
            // Checks if the current node can be expanded, has children object, has children and is expanded
            if (treeNodeData.expandable && treeNodeData.children && treeNodeData.children.length && treeNodeData[treeExpandedPropName]) {
                for (var i = 0; i < treeNodeData.children.length; i++) {
                    treeNodes = treeNodes.concat(this.renderTree(treeNodeData.children[i], treeNodePath + ',' + i, treeNodeDepth + 1));
                }
            }
        }
        return treeNodes;
    };
    KupTree.prototype.render = function () {
        var _this = this;
        // Computes the visible columns for later use
        if (this.showColumns && this.columns) {
            this.visibleColumns = this.columns.filter(function (column) { return column.hasOwnProperty('visible') ? column.visible : true; });
        }
        // Composes TreeNodes
        var treeNodes = [];
        if (this.data && this.data.length) {
            this.data.forEach(function (zeroDepthNode, index) {
                treeNodes = treeNodes.concat(_this.renderTree(zeroDepthNode, index.toString()));
            });
        }
        else {
            // There are no TreeNodes, so we print a single cell with a caption
            treeNodes.push(h("tr", null, h("td", null, "Nessun elemento nell'albero")));
        }
        // Calculates if header must be shown or not
        var visibleHeader = this.showHeader && this.showColumns;
        return [
            h("link", { href: 'https://cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css', rel: "stylesheet", type: "text/css" }),
            h("table", { class: "kup-tree", "data-show-columns": this.showColumns, "data-show-object-navigation": this.showObjectNavigation }, h("thead", { class: { 'header--is-visible': visibleHeader } }, h("tr", null, h("th", null), visibleHeader ? this.renderHeader() : null)), h("tbody", null, treeNodes))
        ];
    };
    Object.defineProperty(KupTree, "watchers", {
        get: function () {
            return {
                "data": ["enrichDataWhenChanged"],
                "selectedNode": ["selectedNodeToStr"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KupTree, "style", {
        get: function () { return ":host{--tre_node-expander_background-color:var(--kup-tre_node-expander_background-color,#e0e0e0);--tre_node-expander_color:var(--kup-tre_node-expander_color,#545454);--tre_node_background-color--hover:var(--kup-tre_node_background-color--hover,#e6e6e6);--tre_node-icon_color:var(--kup-tre_node-icon_color,#545454);--tre_node-icon_size:var(--kup-tre_node-icon_size,16px);--tre_node-indent_width:var(--kup-tre_node-indent_width,16px);--tre_node--disabled_opacity:var(--kup-tre_node--disabled_opacity,.7);--tre_table_border-bottom-color:var(--kup-tre_table_border-bottom-color,#e0e0e0);--tre_table-header_background-color:var(--kup-tre_table-header_background-color,grey);--tre_table-header_color:var(--kup-tre_table-header_color,#fff);--tre_table-header_font-weight:var(--kup-tre_table-header_font-weight,400);display:block}.kup-tree{border-collapse:collapse;width:100%}.kup-tree thead{display:none}.kup-tree thead.header--is-visible{display:table-header-group}.kup-tree thead th{background-color:var(--tre_table-header_background-color);color:var(--tre_table-header_color);font-weight:var(--tre_table-header_font-weight);text-align:left}.kup-tree__indent{display:inline-block;width:calc(var(--tre_node-indent_width) * var(--tree-node_depth, 0))}.kup-tree .options,.kup-tree__icon{-ms-flex-align:center;align-items:center;color:var(--tre_node-icon_color);display:-ms-inline-flexbox;display:inline-flex;font-size:var(--tre_node-icon_size);height:var(--tre_node-icon_size);-ms-flex-pack:center;justify-content:center;width:var(--tre_node-icon_size)}.kup-tree__node>*{vertical-align:middle}.kup-tree__node--disabled{opacity:var(--tre_node--disabled_opacity)}.kup-tree__node--disabled .kup-tree__node__expander{cursor:auto;pointer-events:none}.kup-tree__node__expander{border-radius:50%;color:var(--tre_node-expander_color);cursor:pointer;-webkit-transition:background-color .4s,-webkit-box-shadow .4s,-webkit-transform .4s;transition:background-color .4s,-webkit-box-shadow .4s,-webkit-transform .4s;transition:background-color .4s,box-shadow .4s,transform .4s;transition:background-color .4s,box-shadow .4s,transform .4s,-webkit-box-shadow .4s,-webkit-transform .4s}.kup-tree__node__expander:hover{background-color:var(--tre_node-expander_background-color);-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.kup-tree__node[data-is-expanded] .kup-tree__node__expander{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.kup-tree__node[data-is-expanded] .kup-tree__node__expander:hover{-webkit-box-shadow:rgba(0,0,0,.12) 0 -1px 3px,rgba(0,0,0,.24) 0 -1px 2px;box-shadow:0 -1px 3px rgba(0,0,0,.12),0 -1px 2px rgba(0,0,0,.24)}.kup-tree__node .options{cursor:pointer;float:right;margin-left:8px;opacity:0;-webkit-transition:opacity .6s,visibility .6s;transition:opacity .6s,visibility .6s}.kup-tree__node .options:before{height:inherit;width:inherit}.kup-tree__node--selected>td,.kup-tree__node:hover>td{background-color:var(--tre_node_background-color--hover)}.kup-tree[data-show-columns] .kup-tree__node{border-bottom:solid 1px var(--tre_table_border-bottom-color)}.kup-tree[data-show-object-navigation] .kup-tree__node:hover .options{opacity:1;visibility:visible}.kup-tree[data-show-object-navigation] .kup-tree__node:hover .options:hover{opacity:.54}"; },
        enumerable: true,
        configurable: true
    });
    return KupTree;
}());
export { KupTree as kup_tree };
