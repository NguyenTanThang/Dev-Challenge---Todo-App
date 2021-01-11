import React, { Component } from 'react';
import shortid from "shortid";

class TabGenerator extends Component {

    state = {
        currentTab: 0
    }

    onChangeTab = (index) => {
        this.setState({
            currentTab: index
        })
    }

    renderTabHeaders = () => {
        const {onChangeTab} = this;
        const {tabHeaders} = this.props;
        const {currentTab} = this.state;

        return tabHeaders.map((tabHeader, index) => {
            if (index === currentTab) {
                return <li key={shortid.generate()} className="tab-header active" onClick={() => onChangeTab(index)}>
                    {tabHeader}
                </li>
            }
            return <li key={shortid.generate()} className="tab-header" onClick={() => onChangeTab(index)}>
                {tabHeader}
            </li>
        })
    }

    renderTabContents = () => {
        const {currentTab} = this.state;
        const {tabContents} = this.props;

        return tabContents.map((tabContent, index) => {
            if (index === currentTab) {
                return <div key={shortid.generate()} className="tab-content">
                    {tabContent}
                </div>
            }   
            return <React.Fragment key={shortid.generate()}></React.Fragment>
        });
    }

    render() {
        const {renderTabHeaders, renderTabContents} = this;

        return (
            <div>
                <div className="tab-header-container">
                    <ul>
                        {renderTabHeaders()}
                    </ul>
                </div>
                <div className="tab-content-container">
                    {renderTabContents()}
                </div>
            </div>
        )
    }
}

export default TabGenerator;