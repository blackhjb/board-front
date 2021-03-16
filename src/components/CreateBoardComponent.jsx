import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import '../App.css';
import '../bootstrap.css';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSeq: this.props.match.params.no,
            boardSubject: '',
            boardContent: '',
            boardWriter: ''
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }


    changeTitleHandler = (event) => {
        this.setState({boardSubject: event.target.value});
    }
    changeContentsHandler = (event) => {
        this.setState({boardContent: event.target.value});
    }
    changeMemberNoHandler = (event) => {
        this.setState({boardWriter: event.target.value});
    }

    createBoard = (event) => {
        event.preventDefault();
        let board = {
            boardSubject: this.state.boardSubject,
            boardContent: this.state.boardContent,
            boardWriter: this.state.boardWriter
        };
        console.log("board => "+ JSON.stringify(board));

        if (this.state.boardSeq === '_create') {
            console.log("작성페이지")
            BoardService.createBoard(board).then(res => {
                this.props.history.push('/board');
            });
        } else {
            console.log("수정페이지")
            BoardService.updateBoard(this.state.boardSeq, board).then(res => {
                this.props.history.push('/board');
            });
        }
    }

    cancel() {
        this.props.history.push('/board');
    }

    getTitle() {
        if (this.state.boardSeq === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">{this.state.boardSeq}번 글을 수정 합니다.</h3>
        }
    }
    componentDidMount() {
        if (this.state.boardSeq === '_create') {
            return
        } else {
            BoardService.getOneBoard(this.state.boardSeq).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                    boardSubject: board.boardSubject,
                    boardContent: board.boardContent,
                    boardWriter: board.boardWriter,
                    boardSeq: board.boardSeq
                    });
            });
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                               this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> 제 목 </label>
                                        <input type="text" placeholder="제목" name="boardSubject" className="form-control" 
                                        value={this.state.boardSubject} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 내 용  </label>
                                        <textarea placeholder="내용" name="boardContent" className="form-control" 
                                        value={this.state.boardContent} onChange={this.changeContentsHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 사용자  </label>
                                        <input placeholder="사용자" name="boardWriter" className="form-control" 
                                        value={this.state.boardWriter} onChange={this.changeMemberNoHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>저장</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>취소</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBoardComponent;