import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { loadTemplates, loadBoards, createBoard } from '../store/actions/board.actions';
import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';
import { withRouter } from 'react-router';
import { TemplateList } from '../cmps/board-list/template-list';

class _UserBoards extends React.Component {
  state = { templateBoards: null };

  componentDidMount() {
    const { user } = this.props;
    if (!user) return;
    this.props.loadBoards({ byUserId: user._id });
    this.props.loadTemplates();
  }

  render() {
    const { user, boards, templates, history, createBoard } = this.props;
    if (!user) {
      history.replace('/');
      return <></>;
    }

    return (
      <section className="user-boards">
        <header className="upper-nav">
          <AppHeader isUserBoardsPage={true} />
        </header>
        <section>
          <aside className="side-nav">
            <SideNav />
          </aside>
          {this.props.location.pathname === '/board' && (
            <section className="user-boards-main">
              <UserBoardMain boards={boards} user={user} history={history} />
            </section>
          )}
          {this.props.location.pathname === '/templates' && (
            <TemplateList templates={templates} history={history} createBoard={createBoard} />
          )}
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = {
  loadTemplates,
  loadBoards,
  createBoard,
};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
    boards: state.boardModule.boards,
    templates: state.boardModule.templates,
  };
};

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(withRouter(_UserBoards));
