import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';

const PageNext = ({ pagination, pgsNo, dispatch, action, onSelected }) => {
    let pageMaxSection = Math.ceil(pagination.pageCount / pgsNo);
    let pageCurrentSection = Math.ceil(pagination.currentPage / pgsNo);

    if (pageMaxSection === pageCurrentSection) {
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
                        dispatch(action(pageCurrentSection * pgsNo + 1))
                    else
                        onSelected(pageCurrentSection * pgsNo + 1)
                }}
            />
        </PaginationItem>
    );
};

PageNext.propTypes = {
    pagination: PropTypes.object,
    pgsNo: PropTypes.number,
    dispatch: PropTypes.func,
    action: PropTypes.func,
    onSelected: PropTypes.func
};

export default PageNext;
