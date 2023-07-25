import React, { useEffect, useState, useContext } from 'react'
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom'
import { PDFViewer, Document, Text, Page, View, Image, StyleSheet } from '@react-pdf/renderer';
import styled from "@react-pdf/styled-components";
import Cookies from 'universal-cookie'
import axios from 'axios'
import {NavigationBar} from '../general/NavigationBar'

/*For officers/primers to generate award certifications
*/
const AwardCertificationPage = () => {
  const cookies = new Cookies()
  const [quiz, setQuiz] = useState();
  const [assignment, setAssignment] = useState();
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [assignees, setAssignees] = useState(0);
  const [passees, setPassees] = useState(0);
  const { id } = useParams()

  //If there is no ongoing session go to login page
  if (cookies.get('Token') == null) {
    window.location.href = '/'
  }

  useEffect(() => {
    //make axios call and set Quiz and Questions
    axios.post('/api/assignment/' + id + '/get_assignment', {
      'id': id
    })
    .then(resp => {
      axios.post('/api/quiz/' + resp.data.quiz_id + '/get_quiz', {
        'id': resp.data.quiz_id
      })
      .then(resp => {
        setQuiz(resp.data)
      })
      .catch(resp => errorMessage(resp.response.statusText))
      setAssignment(resp.data)
      axios.post('/api/assigned_account/0/get_assigned_accounts', {
        'assignment_id': resp.data.id
      })
      .then(resp => {
        setAssignedAccounts(resp.data)
        setAssignees(resp.data.length)
      })
      .catch(resp => errorMessage(resp.response.statusText))
      })
    .catch(resp => errorMessage(resp.response.statusText))
  }, [])

  const styles = StyleSheet.create({
    viewer: {
      width: '80vw',
      marginLeft: '10vw',
      height: '80vh',
      marginTop: '5vh'
    },
    logo: {
      height: '4vh'
    },
    text: {
      color: '#228b22',
    }
  });

  const Header = styled.View`
    width: 90%;
    margin-left: 5%;
    margin-top: 2%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: row;
    align-content: flex-start;

    /* hack to get bottom border */
    border: 1px solid #000000;
    border-top: 1px none;
    border-left: 1px none;
    border-right: 1px none;
  `;

  const HeaderText = styled.View`
    width: 100%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
  `;

  const HeaderLogoColumn = styled.View`
    display: flex;
    flex-direction: column;
    /* border: 1px solid #a8026f; */
    font-size: 7px;
  `;

  const HeaderLogoRow = styled.View`
    display: flex;
    flex-direction: row;
  `;

  const HeaderVerseColumn = styled.View`
    display: flex;
    flex-direction: column;
    /* border: 1px solid #a8026f; */
    font-size: 5px;
  `;

  const HeaderVerseRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `;

  const DescriptionBlock = styled.View`
    width: 90%;
    margin-left: 5%;
    margin-top: 4%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
  `;

  const Label = styled.View`
    width: 15%;
    display: flex;
    flex-direction: column;
    text-align: right;
    font-size: 9px;
  `;

  const Description = styled.View`
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    font-size: 9px;
  `;

  const Table = styled.View`
    width: 90%;
    margin-left: 5%;
    margin-top: 4%;
    border: 1px solid #000000;
    border-top: 1px none;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  `;

  const TableHeaderRow = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #B8D5D9;
    height: 3vh;
    border-top: 1px solid #000000;
  `;
  
  const TableRow = styled.View`
    display: flex;
    flex-direction: row;
    height: 2vh;
    border-top: 1px solid #000000;
  `;

  const TableNumberColumn = styled.View`
    width: 10%;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #000000;
    font-size: 9px;
  `;

  const TableNameHeaderColumn = styled.View`
    width: 50%;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #000000;
    font-size: 9px;
  `;

  const TableNameColumn = styled.View`
    width: 50%;
    padding-left: 1%;
    text-align: left;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #000000;
    font-size: 9px;
  `;

  const TableLevelColumn = styled.View`
    width: 20%;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #000000;
    font-size: 9px;
  `;

  const TableResultColumn = styled.View`
    width: 20%;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    font-size: 9px;
  `;

  const SignatureBlock = styled.View`
    width: 15%;
    margin-left: 5%;
    position: absolute;
    bottom: 20%;

    border-top: 1px solid #000000;
  `;

  const CredentialsColumn = styled.View`
    width: 90%;
    height: 5%;
    margin-left: 5%;
    position: absolute;
    bottom: 15%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    font-size: 9px;
  `;

  const Footer = styled.View`
    width: 90%;
    margin-left: 5%;
    position: absolute;
    bottom: 2%;
    flex-wrap: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;

    border-top: 1px solid #D3D3D3;
  `;

  const FooterPageColumn = styled.View`
    display: flex;
    flex-direction: column;
    /* border: 1px solid #a8026f; */
    font-size: 7px;
  `;

    const FooterVersionColumn = styled.View`
    display: flex;
    flex-direction: column;
    /* border: 1px solid #a8026f; */
    font-size: 7px;
  `;

  return(
    <div className="assignment-page">
    <NavigationBar/>
    {quiz != null && <PDFViewer style={styles.viewer}>
      <Document>
        <Page>
          <View>
            <Header>              
              <Image style={styles.logo} src="/packs/media/packs/general/bb-crest-7106b85f04ce6829d39a973203d05a81.png"></Image>
              <HeaderText>
                <HeaderLogoColumn>
                  <HeaderLogoRow>
                    <Text>THE BOYS'BRIGADE</Text>
                  </HeaderLogoRow>
                  <HeaderLogoRow>
                    <Text>21st SINGAPORE COMPANY</Text>
                  </HeaderLogoRow>
                  <HeaderLogoRow>
                    <Text>GEYLANG METHODIST SCHOOL</Text>
                  </HeaderLogoRow>
                  <HeaderLogoRow>
                    <Text>(SECONDARY)</Text>
                  </HeaderLogoRow>
                </HeaderLogoColumn>
                <HeaderVerseColumn>
                  <HeaderVerseRow>
                    <Text>This hope we have as an anchor of the soul, a hope both</Text>
                  </HeaderVerseRow>
                  <HeaderVerseRow>
                    <Text>sure and stedfast and one which enters within the veil</Text>
                  </HeaderVerseRow>
                  <HeaderVerseRow>
                    <Text>where Jesus has entered as a forerunner for us...</Text>
                  </HeaderVerseRow>
                  <HeaderVerseRow>
                    <Text>Hebrews 6:19-20a</Text>
                  </HeaderVerseRow>
                </HeaderVerseColumn>
              </HeaderText>
            </Header>
          </View>

          <Text style={{textAlign: 'center', marginTop: '2%'}}>RESULTS</Text>
          <DescriptionBlock>
            <Label>
              <Text>BADGE:</Text>
              <Text>DATE:</Text>
              <Text>DESCRIPTION:</Text>
            </Label>
            <Description>
              <Text>{quiz.quiz_name}</Text>
              <Text>25/1/2023</Text>
              <Text>Boys have completed assessment for Drill Basic based on curricullum</Text>
            </Description>
          </DescriptionBlock>

          <Table>
            <TableHeaderRow>
              <TableNumberColumn>
                <Text>No.</Text>
              </TableNumberColumn>
              <TableNameHeaderColumn>
                <Text>Name</Text>
              </TableNameHeaderColumn>
              <TableLevelColumn>
                <Text>Level</Text>
              </TableLevelColumn>
              <TableResultColumn>
                <Text>Pass/Fail</Text>
              </TableResultColumn>
            </TableHeaderRow>
            {assignedAccounts.map((assignedAccount) => {
              return(
                <TableRow>
                  <TableNumberColumn>
                    <Text>1</Text>
                  </TableNumberColumn>
                  <TableNameColumn>
                    <Text>{assignedAccount.account_id}</Text>
                  </TableNameColumn>
                  <TableLevelColumn>
                    <Text>Sec </Text>
                  </TableLevelColumn>
                  <TableResultColumn>
                    <Text>{assignedAccount.score}</Text>
                  </TableResultColumn>
                </TableRow>
              )
            })}
          </Table>

          <SignatureBlock></SignatureBlock>
          <CredentialsColumn>
            <Text>Chief Instructor/Assessor's Signature</Text>
            <Text>Name: SCL Colin Tang</Text>
            <Text>Credentials: Acting Platoon Commander, BB 21st Singapore Company</Text>
          </CredentialsColumn>

          <Footer>
            <FooterPageColumn>
              <Text>Page | 1 of 1</Text>
            </FooterPageColumn>
            <FooterVersionColumn>
              <Text>For 32A Submission | 2022 v1</Text>
            </FooterVersionColumn>
          </Footer>
        </Page>
      </Document>
    </PDFViewer>}
    
    <button className="results-button">This should be a button that renders the 32a results</button>
    </div>
  )
}

export { AwardCertificationPage }