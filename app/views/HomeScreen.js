import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Axios from 'axios';
import { Toast, Grid, Row, Col } from 'native-base';
import Modal from 'react-native-modal'
import AnimatableContainer from './AnimatableContainer';
import styles from '../styles/style'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { ScrollView } from 'react-native-gesture-handler';

export const API_ROOT= "https://valueformoney.ng/wp-json/wp/v2/";
class HomeScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            posts:  [],
            links: [],
            titles: [],
            loading: true
        }
    }

    async componentDidMount(){
        await this.getPosts();
    }

    async getPosts(){
        var app = this;
        var links = [];
        var titles = [];
        try {
            let res = await Axios.get(API_ROOT+"posts?offset="+app.state.offset);
            var posts = res.data;
            await posts.forEach(async (elem, val, arr) => {
                let media = await Axios.get(API_ROOT+"media/"+elem.featured_media);
                var link = media.data.guid.rendered;
                titles.push(elem.title.rendered);
                links.push(link);
            });
            app.setState({titles, links, offset: app.state.offset+10, loading: false})
        } catch (error) {
            //
        }
        
    }
    
    
    render() {
        var post = 0;
        return (
            <View>
                <ScrollView>
                    {
                        this.state.titles.forEach((val, index,arr) => {
                            (
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardImage
                                                source={{uri: "https://pbs.twimg.com/profile_images/1093487464113676288/zKSPK3PR_400x400.jpg"}}
                                                title="Some text to help our life"
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </ScrollView>
                <Modal 
                    isVisible={this.state.loading}
                >
                    <View style={styles.loadingModal}>
                        <ActivityIndicator
                            color='#ee00ee'
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

export default HomeScreen
