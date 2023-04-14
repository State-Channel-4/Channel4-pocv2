import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

function TagsGrid({ tags }) {
  const handleTagClick = (tagId) => {
    // Handle tag selection logic here
    console.log(`Selected tag with ID ${tagId}`);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 4, md: 4, sm: 2, xs: 1, xxs: 1}}
      rowHeight={100}
      margin={[10, 10]}
    >
    {tags.tags.map((tag, index) => (
    <div key={`${tag.id}-${index}`} data-grid={{x: 0, y: 0, w: 1, h: 1}}>
        <button className="tag-button" onClick={() => handleTagClick(tag.id)}>
        {tag.name}
        </button>
    </div>
    ))}
    </ResponsiveGridLayout>
  );
}

export default TagsGrid;
