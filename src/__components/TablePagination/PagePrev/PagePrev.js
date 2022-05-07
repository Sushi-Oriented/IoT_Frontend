import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from 'reactstrap';

const PagePrev = ({ pagination, pgsNo, dispatch, action, onSelected }) => {
    let pageCurrentSection = Math.ceil(pagination.currentPage / pgsNo);
    if (pageCurrentSection === 1) {
        return (
            <PaginationItem disabled>
                <PaginationLink previous />
            </PaginationItem>
        );
    }
    return (
        <PaginationItem>
            <PaginationLink
                previous
                onClick={() => {
                    if (dispatch && action) {
                        dispatch(action((pageCurrentSection - 2) * pgsNo + pgsNo));
                    }
                    else {
                        onSelected((pageCurrentSection - 2) * pgsNo + pgsNo);
                    }
                }}
            />
        </PaginationItem>
    );
};

PagePrev.propTypes = {
    pagination: PropTypes.object,
    pgsNo: PropTypes.number,
    dispatch: PropTypes.func,
    action: PropTypes.func,
    onSelected: PropTypes.func
};

export default PagePrev;
