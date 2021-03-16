
import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import '../App.css';
import '../bootstrap.css';
class ListBoardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            pNum: 1,
            paging: {},
            boards: []
        }
        this.createBoard = this.createBoard.bind(this);
    }


    componentDidMount() {
        BoardService.getBoards(this.state.pNum).then((res) => {
            this.setState({ 
                pNum: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    }
	readBoard(no) {
        this.props.history.push(`/read-board/${no}`);
    }

	createBoard() {
        this.props.history.push('/create-board/_create');
    }

    listBoard(pNum) {
        console.log("pageNum : "+ pNum);
        BoardService.getBoards(pNum).then((res) => {
            console.log(res.data);
            this.setState({ 
                pNum: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()} >
            <a className="page-link" onClick = {() => this.listBoard(page)}>{page}</a>
        </li>
        ));   
    }
    isPagingPrev(){
        if (this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum - 1) )} tabindex="-1">Previous</a>
                </li>
            );
        }
    }
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.currentPageNum + 1) )} tabIndex="-1">Next</a>
                </li>
            );
        }
    }
    isMoveToFirstPage() {
        if (this.state.pNum != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }
    isMoveToLastPage() {
        if (this.state.pNum != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }
    render() {
        return (
            <div>
    <h2 className="text-center">Boards List</h2>
    <div className = "row">
                    <button className="btn btn-primary" onClick={this.createBoard}> 글 작성</button>
                </div>
    <div className ="row">
    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>제목 </th>
                                <th>작성일</th>
                                <th>작성자</th>
                                <th>최종수정일</th>
                                <th>내 용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.boardSeq}>
                                        <td> {board.boardSeq} </td>
                                        <td> <a onClick = {() => this.readBoard(board.boardSeq)}>{board.boardSubject} </a></td>
                                        <td> {board.createdDate} </td>
                                        <td> {board.boardWriter} </td>
                                        <td> {board.modifiedDate} </td>
                                        <td> {board.boardContent} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
        </div>
        <div className ="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
        </div>
        );
    }
}

export default ListBoardComponent;
