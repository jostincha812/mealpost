import React, { Component } from 'react'
import { connect } from 'react-redux'
import LazyImage from '../../../../components/LazyImage'
import NumericCounter from '../../../../components/NumericCounter'
import ShowMore from 'react-show-more';

import './styles.css'

import { showMenuModal } from '../../../../redux/actions/menuModal'
import { addToCart, removeFromCart } from '../../../../redux/actions/cart'
import { showNotification } from '../../../../services/notification'

class SideItem extends Component {

  onShowMenuModal = () => {
    this.props.dispatch(showMenuModal(this.props.item))
  }

  onIncrementPurchasedCount = () => {
    this.props.dispatch(addToCart([this.props.item]))

    showNotification('Added to cart', 'success')
  }

  onDecrementPurchasedCount = () => {
    this.props.dispatch(removeFromCart(this.props.item))

    showNotification('Removed from cart', 'info')
  }

  onAddToCart = () => {
    this.props.dispatch(addToCart([this.props.item]))
    
    showNotification('Added to cart', 'success')
  }

  render () {
    let { item, count } = this.props

    return (
      <div className='div-side-item'>
        <div className='div-side-item-info'>
          <div className='div-side-item-detail'>
            <div className='div-side-item-title'>
              { item.name }
            </div>
            <div className='div-side-item-description'>
              <ShowMore
                lines={4}
                more=''
                less=''
              >
              { item.description }
              </ShowMore>
            </div>
          </div>

          <LazyImage className='img-side-item clickable' src={ item.main_image } onClick={ this.onShowMenuModal }/>
        </div>

        <div className='div-side-item-bottom'>
          <div className='div-numeric-counter'>
            <NumericCounter
              count={ count }
              onIncrement={ this.onIncrementPurchasedCount }
              onDecrement={ this.onDecrementPurchasedCount }
            />
          </div>

          <div className='div-side-item-price-add'>
            <div className='div-side-item-price'>
              { item.display_price }
            </div>

            <div className='div-side-item-add clickable' onClick={ this.onIncrementPurchasedCount }>
              Add
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(SideItem)