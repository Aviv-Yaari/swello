import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { Popover } from './popover';
import { MainPage } from './list-popover-pages/main-page';
import { CopyPage } from './list-popover-pages/copy-page';
import { MovePage } from './list-popover-pages/move-page';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { utilService } from '../services/util.service';
import { CardList } from './card-list';

export class _ListPreview extends Component {
  state = {
    popoverPage: 'main',
  };
  bottomAddRef = React.createRef();
  topAddRef = React.createRef();

  componentDidUpdate = prevProps => {
    if (prevProps.isPopoverOpen !== this.props.isPopoverOpen) {
      this.setState({ popoverPage: 'main' });
    }
  };

  onAddCard = (ev, isTopAdd = false) => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const { board, list } = this.props;
    const updatedBoard = boardService.addCard(board, list, title, isTopAdd);
    if (isTopAdd) {
      this.props.onAddingTopCard(false);
    } else {
      this.props.onAddingCard(false);
    }
    this.props.updateBoard(updatedBoard);
  };

  onMovePage = page => {
    this.setState({ popoverPage: page });
  };

  render() {
    const {
      list,
      lists,
      isAddingCard,
      onAddingCard,
      onAddingTopCard,
      isPopoverOpen,
      onTogglePopover,
      isTopAdd,
      onCopyList,
      onMoveList,
    } = this.props;
    const { popoverPage } = this.state;
    return (
      <div className="list-preview flex column">
        <div className="list-header flex space-between">
          <h2
            className="list-title content-editable"
            onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
            contentEditable
            suppressContentEditableWarning={true}>
            {list.title}
          </h2>
          <button
            className="btn-more"
            onClick={() => onTogglePopover(isPopoverOpen ? null : list.id)}>
            <MoreHorizIcon />
          </button>
        </div>
        <Popover isVisible={isPopoverOpen}>
          {popoverPage === 'main' && (
            <MainPage
              onMovePage={this.onMovePage}
              list={list}
              onTogglePopover={onTogglePopover}
              onAddingTopCard={onAddingTopCard}
            />
          )}
          {popoverPage === 'copy' && (
            <CopyPage
              onMovePage={this.onMovePage}
              list={list}
              onTogglePopover={onTogglePopover}
              onCopyList={onCopyList}
            />
          )}
          {popoverPage === 'move' && (
            <MovePage
              onMovePage={this.onMovePage}
              list={list}
              lists={lists}
              onTogglePopover={onTogglePopover}
              onMoveList={onMoveList}
            />
          )}
        </Popover>
        {isTopAdd && (
          <div className="add-card">
            <form onSubmit={ev => this.onAddCard(ev, true)}>
              <textarea
                name="title"
                placeholder="Enter a title for this card..."
                onKeyDown={ev => ev.key === 'Enter' && this.topAddRef.current.click()}
              />
              <div
                className="add-controls flex align-center"
                style={{ gap: '10px', marginBottom: '8px' }}>
                <button ref={this.topAddRef} className="btn-add">
                  Add Card
                </button>
                <CloseIcon
                  style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  onClick={() => onAddingTopCard(false)}
                />
              </div>
            </form>
          </div>
        )}
        {list.cards && <CardList cards={list.cards} />}
        <div className="add-card">
          {!isAddingCard && !isTopAdd && (
            <button className="content btn-adding" onClick={() => onAddingCard(list.id)}>
              <AddIcon />
              <span>Add a card</span>
            </button>
          )}
          {isAddingCard && !isTopAdd && (
            <>
              <form onSubmit={this.onAddCard}>
                <textarea
                  name="title"
                  placeholder="Enter a title for this card..."
                  onKeyDown={ev => ev.key === 'Enter' && this.bottomAddRef.current.click()}
                />
                <div className="add-controls">
                  <button ref={this.bottomAddRef} className="btn-add">
                    Add Card
                  </button>
                  <CloseIcon className="close-icon" onClick={() => onAddingCard(false)} />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
};

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

export const ListPreview = connect(mapStateToProps, mapDispatchToProps)(_ListPreview);
