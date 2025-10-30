import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Highlight from '@site/src/components/Highlight';
import Underline from '@site/src/components/Underline';
import Block from '@site/src/components/Block';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


export default {
    // Re-use the default mapping
    ...MDXComponents,
    Highlight,
    Underline,
    Block,
    Tabs, 
    TabItem, 
};