import axios from 'axios'; 


const BOARD_API_BASE_URL = "http://localhost:8080/api/v1/board"; 

class BoardService {

    getBoards(pNum) {
        return axios.get(BOARD_API_BASE_URL + "?pNum="+ pNum);
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(boardSeq) {
        return axios.get(BOARD_API_BASE_URL + "/" + boardSeq);
    }

    updateBoard(boardSeq, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + boardSeq, board);
    }

    deleteBoard(boardSeq) {
        return axios.delete(BOARD_API_BASE_URL + "/" + boardSeq);
    }
    
}

export default new BoardService();