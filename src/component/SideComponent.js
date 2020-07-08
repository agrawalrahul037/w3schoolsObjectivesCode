import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as applicationAction from '../actions/ApplicationAction';

const mapStateToProps = (state) => ({
    sidePanelData: state.mainReducer.sidePanelData
})
const mapDispatchToProps = (dispatch) => ({
    storeSidePanelData: (ob) => { dispatch(applicationAction.storeSidePanelData(ob)) },
    storeMcqData: (ob) => { dispatch(applicationAction.storeMcqData(ob)) }
})
class SideComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //data: []
        }
    }
    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const jsonName = urlParams.get('ques');
        fetch('data/side-bar.json')
            .then(response => response.json())
            .then(data => {
                /********************For change side selection********************/
                let tempArray = data;
                let tempArrayES6 = [...tempArray];
                for (let i = 0; i < tempArrayES6.length; i++) {
                    if (tempArrayES6[i].id === jsonName) {
                        tempArrayES6[i].selected = true;
                    }
                    else {
                        tempArrayES6[i].selected = false;
                    }
                }
                /*****************End of side selection******************************/
                this.props.storeSidePanelData(tempArrayES6)
            });
    }
    showCurrentTab = (e, index) => {
        let tempArray = this.props.sidePanelData;
        let tempArrayES6 = [...tempArray];
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArrayES6[i].selected == true) {
                tempArrayES6[i].selected = false;
                break;
            }
        }
        tempArrayES6[index].selected = true;
        this.changePageData(tempArrayES6[index].id);
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
        const { sidePanelData } = this.props;
        return (
            <div id="sideBar" className="col-sm-3">
                <div>
                    {sidePanelData !== undefined && sidePanelData.map((ob, index) => {
                        return (
                            <a id={ob.id} key={ob.name} href="javascript:void(0);" onClick={(e) => this.showCurrentTab(e, index)}
                                className={ob.selected ? "active" : ""}>
                                {ob.name}
                            </a>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SideComponent);