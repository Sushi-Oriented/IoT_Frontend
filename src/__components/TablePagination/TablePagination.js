import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'reactstrap';
import PageFirst from './PageFirst/PageFirst';
import PagePrev from './PagePrev/PagePrev';
import PageItems from './PageItems/PageItems';
import PageNext from './PageNext/PageNext';
import PageLast from './PageLast/PageLast';

const TablePagination = ({
    pagination,
    sheetsPerPage,
    dispatcher,
    action,
    onSelected
}) => {
    return (
        <div style={{ display: 'inline-block' }}>
            <Pagination
                size='sm'
                aria-label='Page navigation'
                className='table-pgn'
            >
                <PageFirst
                    pagination={pagination}
                    dispatch={dispatcher}
                    action={action}
                    onSelected={onSelected}
                />
                <PagePrev
                    pagination={pagination}
                    pgsNo={sheetsPerPage}
                    dispatch={dispatcher}
                    action={action}
                    onSelected={onSelected}
                />
                <PageItems
                    pagination={pagination}
                    pgsNo={sheetsPerPage}
                    dispatch={dispatcher}
                    action={action}
                    onSelected={onSelected}
                />
                <PageNext
                    pagination={pagination}
                    pgsNo={sheetsPerPage}
                    dispatch={dispatcher}
                    action={action}
                    onSelected={onSelected}
                />
                <PageLast
                    pagination={pagination}
                    dispatch={dispatcher}
                    action={action}
                    lastPage={pagination.pageCount}
                    onSelected={onSelected}
                />
            </Pagination>
        </div>
    )
};

TablePagination.propTypes = {
    pagination: PropTypes.object,
    sheetsPerPage: PropTypes.number,
    dispatcher: PropTypes.func,
    action: PropTypes.func,
    onSelected: PropTypes.func
};

export default TablePagination;
