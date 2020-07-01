import React, {Component} from 'react';
//Components
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import About from "./AboutComponent";
//Router
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
//Redux
import {connect} from 'react-redux';
import { postComment, fetchDishes,fetchComments,fetchPromos } from '../redux/ActionCreators';
import {actions} from "react-redux-form";


const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}


class Main extends Component{

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render() {
        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading = {this.props.dishes.isLoading}
                      dishesErrMsg = {this.props.dishes.errMsg}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading = {this.props.promotions.isLoading}
                      promosErrMsg = {this.props.promotions.errMsg}
                      leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishWidthId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                            isLoading = {this.props.dishes.isLoading}
                            errMsg = {this.props.dishes.errMsg}
                            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                            commentsErrMsg = {this.props.comments.errMsg}
                            postComment={this.props.postComment}
                />
            );
        }
        const AboutPage = () =>{
            return(
                <About leaders={this.props.leaders}/>
            );
        }
        return (
            <div >
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWidthId}/>
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>} />} />
                    <Route path='/aboutus' component={AboutPage}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
//
    //

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
