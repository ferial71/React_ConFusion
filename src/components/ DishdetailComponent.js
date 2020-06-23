import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props) {
        super(props);

    }
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
    renderComments(dish){
        const header = <h4>Commnets</h4>
        if (dish != null){
            return (
                dish.comments.map(function (comment) {
                    return (
                        <div key={comment.id} className="list-unstyled">
                            <ul></ul>
                                <li>{comment.comment}</li>
                            <ul></ul>
                                <li>-- {comment.author},{comment.date.slice(0, 10)}</li>

                        </div>
                    );
                })
            );
        }
        else
            return (
              <div></div>
            );
    }


    render() {
        return(
            <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4 left>Comments</h4>
                        {this.renderComments(this.props.dish)}
                    </div>
            </div>
        );
    }
}
export default Dishdetail;