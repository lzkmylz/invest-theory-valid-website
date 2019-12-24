import React from 'react';
import { observer } from 'mobx-react';
import { HistoryInterface } from '../../../Utils/Interfaces';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import '../Styles/GRUPredictSHIndexContainer.scss';

@observer
class GRUPredictSHIndexContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="grupredict-sh-index" >
        <Header history={this.props.history} />
        <div className="grupredict-sh-main" >

        </div>
        <Footer />
      </div>
    );
  }
}

export default GRUPredictSHIndexContainer;
