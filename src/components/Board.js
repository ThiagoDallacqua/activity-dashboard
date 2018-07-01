import React from 'react'
import styled from 'styled-components'
import Data from '../helper/data.js'

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

const ProcessedData = Data.reduce((acc, currValue, currIndex, arr) => {
    const date = new Date(currValue.date)
    const weekDay = date.toString().split(' ')[0]
    const month = months[currValue.date.split('-')[1] - 1]
    const day = currValue.date.split('-')[2] - 1
    let prevMonth
    let prevDay
    if (currIndex !== 0) {
        prevMonth = months[arr[currIndex - 1].date.split('-')[1] - 1]
        prevDay = arr[currIndex - 1].date.split('-')[2] - 1        
    }

    if (month === prevMonth && day === prevDay + 1) {
        acc.weekDays[weekDay].push(currValue.count)
    } else {
        acc.weekDays[weekDay].push(0)
    }
    
    acc.totalCount += currValue.count
    if (acc.months.indexOf(month) === -1) acc.months.push(month)
    
    return acc
}, {
        totalCount: 0,
        months: [],
        weekDays: {
            Sun: [],
            Mon: [],
            Tue: [],
            Wed: [],
            Thu: [],
            Fri: [],
            Sat: []
        }
    })

const ProcessColor = amount => {
    if (amount === 0) {
        return '#eee'   
    }if (amount <= 10) {
        return '#c6e48b'    
    }if (amount <= 20) {
        return '#7bc96f'    
    }if (amount <= 30) {
        return '#239a3b'    
    } else {
        return '#196127'    
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 750px;
`;

const InfoContainer = Container.extend`
    flex-direction: row;
    margin-bottom: 5px;
`;

const Header = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 400;
`;

const Settings = styled.p`
    margin: 0;
    font-size: 14px;
`;

const ChartContainer = styled.div`
    border: 1px solid gray;
    width: 100%;
    padding: 5px 20px;
`;

const Chart = styled.table`
    width: 100%;
`

const THead = styled.thead``

const TBody = styled.tbody``

const Row = styled.tr`
    height: 15px;
`

const HeadCell = styled.th`
    width: 15px;
    margin: 0;
    padding: 0;
`

const Cell = styled.td`
    margin: 0;
    padding: 0;
    width: 5px;
    height: 5px;
    background-color: ${({ amount }) => ProcessColor(amount)}
`

const WeekCell = styled.td`
    width: 15px;
    height: 5px;
    margin: 0;
    padding: 0;
`

const Board = () => {
    const WeekRows = []
    for (const key in ProcessedData.weekDays) {
        if (["Sun", "Tue", "Thu", "Sat"].indexOf(key) != -1) {
            WeekRows.push(
                <Row key={key}>
                    <WeekCell />
                    {
                        ProcessedData.weekDays[key].map((day, index) => <Cell key={index} amount={day}></Cell>)
                    }
                </Row>
            )
        } else {
            WeekRows.push(
                <Row key={key}>
                    <WeekCell>{key}</WeekCell>
                    {
                        ProcessedData.weekDays[key].map((day, index) => <Cell key={index} amount={day}></Cell>)
                    }
                </Row> 
            )
        }
    }
    return (
        <Container>
            <InfoContainer>
                <Header>{`${ProcessedData.totalCount.toLocaleString()} contributions in 2016`}</Header>
                <Settings>contributions settings</Settings>
            </InfoContainer>
            <ChartContainer>
                <Chart>
                    <THead>
                        <Row>
                            <HeadCell />
                            {
                                ProcessedData.months.map((month, index) => <HeadCell colSpan="3" key={index}>{month}</HeadCell>) 
                            }
                        </Row>
                    </THead>
                    <TBody>
                        {
                            WeekRows.map(week => week)
                        }
                    </TBody>
                </Chart>
            </ChartContainer>
        </Container>
    )
}

export default Board