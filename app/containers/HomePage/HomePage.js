/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReposList from 'components/ReposList';
import './style.scss';

import {
  Tab, Tabs, TabList, TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  render() {
    const {
      loading, error, repos, changeTab, activeTab, categories
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    const tabs = categories.map((category) => ({
      label: category,
      content: (<div></div>)
    }));
    tabs[activeTab].content = (
      <ReposList {...reposListProps} />
    );

    /* eslint-disable react/no-array-index-key */
    return (
      <article>
        <div className="home-page">
          <section className="centered">
            <Tabs onSelect={changeTab}>
              <TabList>
                {
                  tabs.map((tab, idx) => <Tab key={idx}>{tab.label}</Tab>)
                }
              </TabList>
              {
                tabs.map((tab, idx) => <TabPanel key={idx}>{tab.content}</TabPanel>)
              }
            </Tabs>
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadPosts: PropTypes.func,
  changeTab: PropTypes.func,
  activeTab: PropTypes.number,
  categories: PropTypes.array
};
