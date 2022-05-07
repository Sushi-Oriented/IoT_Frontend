import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';

function PageItems({ pagination, pgsNo, dispatch, action, onSelected }) {

    let pageCurrentSection = Math.ceil(pagination.currentPage / pgsNo);
    let pageCurrentMax = pgsNo;
    if (pagination.pageCount < pgsNo) {
        pageCurrentMax = pagination.pageCount;
    } else {
        if (pageCurrentSection * pgsNo > pagination.pageCount) {
            pageCurrentMax = pgsNo - (pageCurrentSection * pgsNo - pagination.pageCount);
        }
    }
    let pageCount = Array.from(
        Array(pageCurrentMax),
        (_, x) => (pageCurrentSection - 1) * pgsNo + 1 + x
    );
    return pageCount.map(page => {
        let active = true;
        if (page !== pagination.currentPage) {
            active = false;
        }
        return (
            <PaginationItem key={page} active={active}>
                <PaginationLink
                    onClick={() => {
                        if (dispatch && action)
                            dispatch(action(page));
                        else
                            onSelected(page)
                    }}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        );
    });
}

PageItems.propTypes = {
    pagination: PropTypes.object,
    dispatch: PropTypes.func,
    action: PropTypes.func,
    pgsNo: PropTypes.number,
    onSelected: PropTypes.func
};

export default PageItems;

