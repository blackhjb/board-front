import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import '../App.css';
import '../bootstrap.css';
class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            boardSeq: this.props.match.params.no,
            board: {}
        }

    }
    componentDidMount() {
        BoardService.getOneBoard(this.state.boardSeq).then( res => {
            this.setState({board: res.data});
        });
    }

    returnDate(cTime, uTime) {
        return (
            <div className = "row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.boardSeq}`);
    }

    deleteView = async function () {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            BoardService.deleteBoard(this.state.boardSeq).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                // if (res.status == 200) {
                //     this.props.history.push('/board');
                // } else {
                //     alert("글 삭제가 실패했습니다.");
                // }
            });

        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> 상 세 화면</h3>
                    <div className = "card-body">
                            <div className = "row">      
                                <label> 제 목 </label> : {this.state.board.boardSubject}
                            </div>

                            <div className = "row">
                                <label> 내 용 </label> : <br></br>
                                <textarea value={this.state.board.boardContent} readOnly/> 
                            </div >

                            <div className = "row">
                                <label> 작성자  </label>: 
                                {this.state.board.boardWriter}
                            </div>

                            {this.returnDate(this.state.board.createdDate, this.state.board.modifiedDate) }
                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                            <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>글 삭제</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReadBoardComponent;