import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';

const PageFirst = ({ pagination, dispatch, action, onSelected }) => {
    if (pagination.currentPage === 1) {
        return (
            <PaginationItem disabled>
                <PaginationLink previous={true} />
            </PaginationItem>
        );
    }
    return (
        <PaginationItem>
            <PaginationLink
                previous={true}
                onClick={() => {
                    if (dispatch && action)
                        dispatch(action(1));
                    else
                        onSelected(1)
                }}
            />
        </PaginationItem>
    );
};

PageFirst.propTypes = {
    pagination: PropTypes.object,
    dispatch: PropTypes.func,
    action: PropTypes.func,
    onSelected: PropTypes.func
};

export default PageFirst;
