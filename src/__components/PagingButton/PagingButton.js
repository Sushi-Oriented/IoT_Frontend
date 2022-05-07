import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ButtonDropdown,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class PagingButton extends Component {
    static propTypes = {
        numberOfRows: PropTypes.number,
        dispatch: PropTypes.func,
        action: PropTypes.func,
        onSelected: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    onClicked = (itemCount) => {
        const { dispatch, action, onSelected } = this.props;
        if ((!dispatch || !action) && onSelected) {
            onSelected(itemCount);
        } else {
            dispatch(action(itemCount));
        }
    }

    render() {
        const { numberOfRows } = this.props;
        const { isOpen } = this.state;

        return (
            <ButtonDropdown isOpen={isOpen} toggle={() => this.setState({ isOpen: !isOpen })}>
                <Button size='sm' color='secondary' className='btn-ghost-*'>
                    <span className='lead font-sm font-italic'>
                        No. of rows:{' '}
                    </span>
                </Button>
                <DropdownToggle caret size='sm' color='dark'>
                    {numberOfRows}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => { this.onClicked(10) }}>
                        10
                </DropdownItem>
                    <DropdownItem onClick={() => { this.onClicked(20); }}>
                        20
                </DropdownItem>
                    <DropdownItem onClick={() => { this.onClicked(50) }}>
                        50
                </DropdownItem>
                    <DropdownItem onClick={() => { this.onClicked(100) }}>
                        100
                </DropdownItem>
                    <DropdownItem onClick={() => { this.onClicked(300) }}>
                        300
                </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}

export default PagingButton;