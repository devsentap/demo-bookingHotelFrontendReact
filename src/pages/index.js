import React, { Component } from "react"
import "bulma/css/bulma.min.css"
import { Section, Container, Tabs, TabList, Tab, TabLink, Content, Footer, Box, Title, Table, Button } from "bloomer"
import Layout from "../components/layout"
import data from "../test.json"

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data) {    
    document.getElementById('debug').textContent = "Booked " + data.roomTypeLabel + ", " + data.bedTypeLabel + ", " + data.boardCodeDescription + ", " + data.totalPrice;
  }

  renderBox() {
    let boxes = [],
      boxes_comp = [];

    //gets room type, so we can render different box for each room type
    data.forEach(element => {
      if (boxes.includes(element.roomTypeLabel[0]) === false) {
        boxes.push(element.roomTypeLabel[0]);
      }
    });

    boxes.forEach((element, box_index) => {
      //get rooms by its type, so we can render the rooms within the correct type (box)
      let arr = data.filter(el => el.roomTypeLabel[0] === element);
      let rooms = [];
      arr.forEach((room, room_index) => {
        rooms.push(
          <tr key={room_index}>
            <td style={{ verticalAlign: 'middle' }}>{room.name}</td>
            <td style={{ verticalAlign: 'middle' }}>
              Bed Type: {room.bedTypeLabel.join(',')}
              <br />
              Board: {room.boardCodeDescription}
            </td>
            <td style={{ verticalAlign: 'middle', textAlign: 'right' }}>
              <span style={{ marginRight: '10px' }}>RM {room.totalPrice}</span>
              <Button isColor="success" isOutlined isSize="small" onClick={e => this.handleClick(room)}>Book Room</Button>
            </td>
          </tr>
        );
      });

      boxes_comp.push(
        <Box key={box_index}>
          <Title>{element}</Title>
          <Table isFullWidth isStriped isBordered isNarrow>
            <tbody>{rooms}</tbody>
          </Table>
        </Box>
      );
    });

    return boxes_comp;
  }

  render() {
    return (
      <Layout>
        <Section>
          <Container isFluid>
            <Tabs isAlign="centered" isToggle>
              <TabList>
                <Tab>
                  <TabLink>1. Choose Date</TabLink>
                </Tab>
                <Tab isActive>
                  <TabLink>2. Choose Room</TabLink>
                </Tab>
                <Tab>
                  <TabLink>3. Checkout</TabLink>
                </Tab>
              </TabList>
            </Tabs>
            <Content>AVAILABLE ROOMS</Content>
            {
              this.renderBox()
            }
            <Footer>
              <p>Debug Logs: </p>
              <p id="debug"></p>
            </Footer>
          </Container>
        </Section>
      </Layout>
    );
  }
}

export default IndexPage