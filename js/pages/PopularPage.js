import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ListView
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularPage extends Component{

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          style={{backgroundColor: '#6495ED'}}
        />
        <ScrollableTabView
          renderTabBar={()=><ScrollableTabBar/>}
        >
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="ios">ios</PopularTab>
          <PopularTab tabLabel="android">android</PopularTab>
          <PopularTab tabLabel="js">js</PopularTab>
        </ScrollableTabView>
      </View>
    )
  }
}

class PopularTab extends Component{
  constructor(props){
    super(props);
    this.state={
      result:'',
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    };
    this.dataRepository=new DataRepository();
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    let url=URL+this.props.tabLabel+QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(result=>{
        this.setState({
          result:JSON.stringify(result)
        })
        console.log(result)
      })
      .catch(error=>{
        this.setState({
          result:JSON.stringify(error)
        })
      })
  }
  render(){
    return (

    )
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 29,
  }
});
