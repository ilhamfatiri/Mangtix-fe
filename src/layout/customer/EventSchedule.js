import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchDataTicket} from "../../modules/tickets/service/TicketService";
import {
    fetcheventdetailbyid,
    fetchticketsuccess, handlequantity,
    handletickettransient, handleusertransient
} from "../../reducerCustomer/ActionReducerCustomer";
import {Link} from "react-router-dom";
import {fetchDataEventDetailId} from "../../modules/events/service/EventService";
import decodeJwtToken from "../../authentication/AutheticationDecodeJwt";
import {saveDataCart} from "../../modules/cart/service/CartService";

class EventSchedule extends Component {
    render() {
        console.log("LOGGG", this.props);
        let stock = 0;
        this.props.ticket.map((element1) => {
            if (element1.eventDetail.id === this.props.eventDetailById.id) {
                return element1.ticketCodes.map((ticketCode) => {
                    if (ticketCode.available == true) {
                        return stock = stock + 1;
                    }
                })
            }


        })
        return (
            <div>

                <section class="hero-banner hero-banner-sm">
                </section>

                <section className="section-padding--small sponsor-bg">
                    <div className="container">
                        <div className="section-intro text-center pb-98px">
                            <p className="section-intro__title">Join the event</p>
                            <h2 className="primary-text">Schedule</h2>
                            <img src="img/home/section-style.png" alt=""></img>
                        </div>
                        <div className="row">
                            <div className="col-xl-10 offset-xl-1">
                                <div className="scheduleTab">
                                    <ul className="nav nav-tabs">
                                        {this.props.eventDetail.map((element, index) => {
                                            return <>
                                                <li className="nav-tabstabsitem text-center">
                                                    <button onClick={() => (this.handleEventDetail(element.id))}
                                                            className={element.id === this.props.eventDetailById.id ? "btn active btn-group-toggle" : "btn btn-group-toggle"}
                                                            data-toggle="tab">
                                                        <h4>{element.eventDay}</h4>
                                                        <p>{element.eventDate}</p>
                                                    </button>
                                                </li>
                                            </>
                                        })}
                                    </ul>

                                    <div className="tab-content">
                                        {this.props.ticket.map((element1) => {
                                            console.log("kondisi")
                                            if (element1.eventDetail.id === this.props.eventDetailById.id) {
                                                return <div>
                                                    <div id="day" className="tab-pane">
                                                        <div className="schedule-card">
                                                            <div className="row no-gutters">
                                                                <div className="col-lg-3">
                                                                    <img src="img/clients-logo/VVIP.png"
                                                                         alt=""></img>
                                                                </div>

                                                                {stock > 0 ?
                                                                    <div className="col-md-9 align-self-center">
                                                                        <div className="schedule-content">
                                                                            <p className="schedule-date">{element1.eventDetail.eventDate}</p>
                                                                            <a className="schedule-title"
                                                                               href="#"></a>
                                                                            <h3>{element1.category.categoryName}</h3>
                                                                            <h4>{stock}</h4>
                                                                            <div className="row mt-5">
                                                                                <div className="col-12 text-center">
                                                                                    <button onClick={() => {
                                                                                        this.addCart(element1.id)
                                                                                    }} className="button mb-2">Choose
                                                                                        Ticket
                                                                                    </button>
                                                                                    <Link onClick={() => {
                                                                                        this.addCart(element1.id)
                                                                                    }} className="button mb-2"
                                                                                          to="/cart">Buy
                                                                                        Ticket</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    : <div className="col-md-9 align-self-center">
                                                                        <div className="schedule-content">
                                                                            <p className="schedule-date">{element1.eventDetail.eventDate}</p>
                                                                            <a className="schedule-title"
                                                                               href="#"></a>
                                                                            <h3>{element1.category.categoryName}</h3>
                                                                            <h4>Ticket Sold Out</h4>
                                                                            <div className="row mt-5">
                                                                                <div className="col-12 text-center">
                                                                                    <button disabled={true} className="button mb-2">Choose
                                                                                        Ticket
                                                                                    </button>
                                                                                    <Link disabled={true} className="button mb-2">Buy
                                                                                        Ticket</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    addCart = async (ticketId) => {
        this.props.dispatch({...handletickettransient, ticketIdTransient: ticketId})
        const dataToken = decodeJwtToken();
        if (!(dataToken === null)) {
            const idUser = dataToken.jti;
            console.log(idUser, "userId")
            this.props.dispatch({...handleusertransient, userIdTransient: idUser})
        }
        this.props.dispatch({...handlequantity, quantity: 1})
        await saveDataCart(this.props.cartForm)
    }
    dataTickets = async () => {
        const data = await fetchDataTicket();
        let action = {...fetchticketsuccess, payload: data}
        this.props.dispatch(action)
        console.log(this.props.ticket + "data ticket")

    }

    handleEventDetail = async (eventDetailId) => {
        const data = await fetchDataEventDetailId(eventDetailId)
        console.log(data)
        let action = {...fetcheventdetailbyid, payload: data}
        console.log(action)
        this.props.dispatch(action)
    }

    componentDidMount() {
        this.dataTickets();
    }

}

const mapStateToProps = (state) => {
    console.log(state, "ini mapStateToProps");
    return {...state};
}
export default connect(mapStateToProps)(EventSchedule);
