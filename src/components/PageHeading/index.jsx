import React from 'react';
import PropTypes from 'prop-types';

const PageHeading = ({ heading }) => {
    return (
        <h1 style={{ marginBottom: '20px' }}>
            {heading}
        </h1>
    );
};

PageHeading.propTypes = {
    heading: PropTypes.string.isRequired,
};

export default PageHeading;