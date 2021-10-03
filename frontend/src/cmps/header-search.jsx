import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { PopoverMenu } from './header-popover-pages/popover-menu';
import { CardPreviewInfo } from './card-preview';
import { cardService } from '../services/board-services/card.service';
import { withRouter } from 'react-router';

export class HeaderSearch extends Component {
  state = { search: '', isActive: false, cards: [] };
  searchContainerRef = React.createRef();
  toggleMenu = this.props.toggleMenu;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board !== this.props.board) this.updateStateCards();
  }

  updateStateCards = () => {
    const cards = this.state.cards.map(card => cardService.getCardById(this.props.board, card.id));
    this.setState({ cards });
  };

  openMenu = ev => {
    if (ev) ev.stopPropagation();
    !this.props.menu.isOpen && this.toggleMenu(true, 'header-search', this.searchContainerRef.current);
  };

  handleChange = ev => {
    const search = ev.target.value;
    this.setState({ search });
    if (!search) return this.toggleMenu(false);
    this.openMenu();
    const searchRegex = new RegExp(search, 'i');
    const cards = [];
    this.props.board.lists.forEach(list =>
      list.cards.forEach(card => searchRegex.test(card.title) && cards.push({ ...card, listTitle: list.title }))
    );
    this.setState({ cards });
  };

  get recentCards() {
    const cards = [];
    this.props.board && this.props.board.lists.forEach(list => list.cards.forEach(card => cards.push(card)));
    cards.sort((a, b) => b?.createdAt - a?.createdAt);
    return cards;
  }

  render() {
    const { isActive, cards, search } = this.state;
    const { board } = this.props;
    return (
      <div ref={this.searchContainerRef} className={'header-search flex align-center' + (isActive ? ' active' : '')}>
        <span>
          <SearchIcon />
        </span>
        <input
          autoCorrect="off"
          autoComplete="off"
          type="text"
          placeholder="Search"
          onClick={this.openMenu}
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
          onChange={this.handleChange}
        />
        {isActive && (
          <span style={{ height: '16px' }}>
            <CloseIcon className="icon-close" />
          </span>
        )}
        <PopoverMenu id="header-search" classNames="header-search-popper" placement="bottom">
          {search && (
            <div>
              <div className="sub-header">Cards</div>
              <SearchCardList boardId={board._id} cards={cards} />
            </div>
          )}
          {!search && (
            <div>
              <div className="sub-header">Recent Cards</div>
              <RecentCardList recentCards={this.recentCards} />
            </div>
          )}
        </PopoverMenu>
      </div>
    );
  }
}

function _SearchCardList({ cards, history, boardId }) {
  if (!cards.length) return <></>;
  return (
    <section className="search-card-list">
      {cards.map(card => (
        <div className="search-card flex">
          <CardPreviewInfo key={card.id} card={card} />
          <section>
            <div className="card-title" onClick={() => history.push(`/board/${boardId}/card/${card.id}`)}>
              {card.title}
            </div>
            <div className="list-title">
              in <span>{card.listTitle}</span>
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
const SearchCardList = withRouter(_SearchCardList);

function RecentCardList({ recentCards }) {
  if (!recentCards.length) return <div>No Recent cards.</div>;
  return (
    <section className="recent-card-list flex column">
      {recentCards.map(card => (
        <div className="recent-card">
          <CardPreviewInfo key={card.id} card={card} />
        </div>
      ))}
    </section>
  );
}
