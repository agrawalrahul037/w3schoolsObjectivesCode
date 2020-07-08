import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as applicationAction from '../actions/ApplicationAction';

const mapStateToProps = (state) => ({
    sidePanelData: state.mainReducer.sidePanelData,
    mcqData: state.mainReducer.mcqData
})

const mapDispatchToProps = (dispatch) => ({
    storeSidePanelData: (ob) => { dispatch(applicationAction.storeSidePanelData(ob)) },
    storeMcqData: (ob) => { dispatch(applicationAction.storeMcqData(ob)) }
})
class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // data: []
        }
    }
    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const jsonName = urlParams.get('ques');
        fetch('data/' + jsonName + '.json')
            .then(response => response.json())
            .then(data => {
                //this.setState({ data: data })
                this.props.storeMcqData(data)
            });
    }
    showHideAnswer = (inx) => {
        let questionArray = this.props.mcqData;
        let questionArrayES6 = { ...questionArray };
        questionArrayES6.questionsList[inx].showAnswer = !questionArrayES6.questionsList[inx].showAnswer;
        this.props.storeMcqData(questionArrayES6)
        // this.setState({ data: questionArray })
    }
    onChangePage = (str) => {
        let tempArray = this.props.sidePanelData;
        let tempArrayES6 = [...tempArray];
        for (let i = 0; i < tempArrayES6.length; i++) {
            if (tempArrayES6[i].selected == true) {
                if (str == "next" && i !== (tempArrayES6.length - 1)) {
                    tempArrayES6[i].selected = false;
                    tempArrayES6[i + 1].selected = true;
                    this.changePageData(tempArrayES6[i + 1].id);
                }
                if (str == "prev" && i !== 0) {
                    tempArrayES6[i].selected = false;
                    tempArrayES6[i - 1].selected = true;
                    this.changePageData(tempArrayES6[i - 1].id);
                }
                break;
            }
        }
        this.props.storeSidePanelData(tempArrayES6)
    }
    changePageData = (val) => {
        window.location.href = window.location.origin + window.location.pathname + '?ques=' + val;
        fetch('data/' + val + '.json')
            .then(response => response.json())
            .then(data => {
                this.props.storeMcqData(data)
            });
    }
    render() {
        const { mcqData } = this.props;
        return (
            <div id="mainArea" className="col-sm-9 p-5">
                <div id="preNextBtnContainer" className="row">
                    <a href="javascript:void(0);" onClick={() => this.onChangePage("prev")}>&lt; Previous</a>
                    <span className="col-sm-8"></span>
                    <a href="javascript:void(0);" onClick={() => this.onChangePage("next")}>Next &gt;</a>
                </div>
                {mcqData !== undefined && mcqData.questionsList.map((ob, index) => {
                    return (<div key={ob.questionId}>
                        <p><strong>Question{index + 1}: </strong>{ob.question}</p>
                        <div>
                            {ob.options !== undefined && ob.options.map((currentOb, index) => {
                                return (<div className="questionContainer">
                                    <strong><label>({currentOb.questionNumber})</label></strong>
                                    <input type="radio" name={ob.questionId}></input>
                                    <label>{currentOb.questionLabel}</label>
                                </div>)
                            })}
                            <div style={{ display: (ob.showAnswer == true) ? "" : "none" }}>
                                <strong><label>Answer:</label></strong>
                                <span className="correctAnswer">{ob.answer.questionNumber}</span>
                                <br></br>
                                <div className="codeParent">
                                    <code>
                                        <span dangerouslySetInnerHTML={{ __html: ob.answer.description }}></span>
                                    </code>
                                </div>
                            </div>
                            <div className="pt-1 pb-3">
                                <button onClick={() => this.showHideAnswer(index)}>{(ob.showAnswer) ? "Hide Answer" : "View Answer"}</button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MainComponent);