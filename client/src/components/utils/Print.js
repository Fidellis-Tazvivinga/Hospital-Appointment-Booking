import React from 'react';

const Print = React.forwardRef((ref) => {
    return (
        <div ref={ref}>My cool  content here!</div>
    );
});


export default Print