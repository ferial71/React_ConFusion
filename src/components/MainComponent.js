import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())}

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
                      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                      leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishWidthId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                            isLoading = {this.props.dishes.isLoading}
                            errMsg = {this.props.dishes.errMsg}
                            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                            addComment={this.props.addComment}
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
                    <Route exact path='/contactus' component={Contact} />} />
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
