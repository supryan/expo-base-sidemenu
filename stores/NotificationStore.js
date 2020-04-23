import React from 'react';
import { observable, action, computed, decorate } from 'mobx';
import { Loader } from '../components/notifications/Loader';
import { Snackbar } from '../components/notifications/Snackbar';

const LOADING_TIMEOUT = 3000; // 3 sec

export class NotificationStore {
    loaderTimeout;
    loading = false;
    notifiers = [];

    // Show loader
    showLoader() {
        clearTimeout(this.loaderTimeout);

        this.loading = true;

        // Auto hide
        this.loaderTimeout = setTimeout(() => {
            clearTimeout(this.loaderTimeout);
            this.loading = false;
        }, LOADING_TIMEOUT);
    }

    hideLoader() {
        // Have a timeout to hide due to the delay to start the animation
        setTimeout(() => {
            this.loading = false;
            clearTimeout(this.loaderTimeout);
        }, 0);
    }

    // Show alert, wait for promise
    showSnackbar(message) {
        this.notifiers.push(message);
    }

    // Hide alert
    hideSnackbar(index) {
        // Remove from notifiers array after animation
        setTimeout(() => {
            this.notifiers.splice(index, 1);
        }, 500);
    }

    // Loop through queue and instantiate Snackbar component
    get initLoader() {
        return <Loader loading={this.loading} />;
    }

    // Loop through queue and instantiate Snackbar component
    get initSnackbar() {
        return this.notifiers.map((message, index) => {
            // Only render most recent snackbar
            if (index === this.notifiers.length - 1 && !this.loading) {
                return (
                    <Snackbar
                        key={index}
                        tabsHeight={message.offset}
                        message={message.text}
                        route={message.route}
                        button={message.button}
                        params={message.params}
                    />
                );
            }
        });
    }
}

decorate(NotificationStore, {
    loading: observable,
    notifiers: observable,
    showLoader: action,
    hideLoader: action,
    showSnackbar: action,
    hideSnackbar: action,
    initLoader: computed,
    initSnackbar: computed
});
