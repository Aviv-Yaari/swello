import React from 'react';
import { BoardList } from '../cmps/board-list/board-list';
import { AppHeader } from '../cmps/app-header';

import { storageService } from '../services/async-storage.service';
import { boardService } from '../services/board.service';
import { userService } from '../services/user.service';
import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';

export class UserBoards extends React.Component {
  state = {};

  async componentDidMount() {
    await storageService.init();
  }

  render() {
    return (
      <section className="user-boards">
        <header className="upper-nav">
          <AppHeader />
        </header>
        <section>
          <aside className="side-nav">
            <SideNav />
          </aside>
          <section className="user-boards-main">
            <UserBoardMain />
          </section>
        </section>
      </section>
    );
  }
}
