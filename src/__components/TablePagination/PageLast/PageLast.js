import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';

function PageLast({ pagination, lastPage, dispatch, action, onSelected }) {
    if (pagination.currentPage === pagination.pageCount) {
        return (
            <PaginationItem disabled>
                <PaginationLink next />
            </PaginationItem>
        );
    }
    return (
        <PaginationItem>
            <PaginationLink
                next
                onClick={() => {
                    if (dispatch && action)
                        dispatch(action(lastPage));
                    else
                        onSelected(lastPage)
                }}
            />
        </PaginationItem>
    );
}

PageLast.propTypes = {
    pagination: PropTypes.object,
    dispatch: PropTypes.func,
    action: PropTypes.func,
    lastPage: PropTypes.number,
    onSelected: PropTypes.func
};

export default PageLast;

