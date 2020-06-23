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
        if (dish != null){
            return (
                dish.comments.map(function (comment) {
                    return (
                        <div key={comment.id} className="list-unstyled">
                            <ul></ul>
                                <li>{comment.comment}</li>
                            <ul></ul>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>

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
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish)}
                    </div>
            </div>
        );
    }
}
export default Dishdetail;