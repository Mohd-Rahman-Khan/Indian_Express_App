import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import COLORS from '../../GlobalConstants/COLORS';
import images from '../../Image';

export default function Dashboard({data, role}) {
  return role == 'Circulation Executive' ||
    role == 'Depot Salesman' ||
    role == 'Parcel Vendor' ? (
    <View
      style={[
        styles.tableContainer,
        {
          borderBottomColor: 'black',
          borderBottomWidth: 0.4,
        },
      ]}>
      {data.map((item, index) => {
        let getKey = Object.keys(item);
        let getValue = Object.values(item);

        return (
          <View
            key={index + 1}
            style={{borderBottomColor: COLORS.black, borderBottomWidth: 0.4}}>
            <View style={styles.tableDetailContainer}>
              <View style={[styles.depotParcelContainer, {width: '50%'}]}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {getKey}
                </Text>
              </View>
              <View style={[styles.depotContainer, {width: '50%'}]}>
                <Text style={styles.tableListDetailText}>{getValue}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  ) : role == 'Regional Manager' || role == 'City Head' ? (
    data?.map((renderItem, index) => {
      let getDivisionKey = Object.keys(renderItem);
      let getDivisionValue = Object.values(renderItem);
      return (
        <View
          key={index}
          style={{
            backgroundColor: 'white',
            borderWidth: 0.4,
            borderColor: 'black',
            marginTop: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {getDivisionKey}
            </Text>
          </View>

          {getDivisionValue[0]?.map((item, index2) => {
            let getPublicationKey = Object.keys(item);
            let getPublicationValue = Object.values(item);
            return (
              <View
                key={index2}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderTopWidth: 0.4,
                  borderTopColor: 'black',
                }}>
                <View
                  style={{
                    width: '60%',
                    borderRightColor: 'black',
                    borderRightWidth: 0.4,
                    paddingVertical: 4,
                  }}>
                  <Text style={styles.tableListDetailText}>
                    {getPublicationKey}
                  </Text>
                </View>
                <View style={{width: '35%', paddingVertical: 5}}>
                  <Text style={styles.tableListDetailText}>
                    {getPublicationValue}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      );
    })
  ) : null;
}

const styles = StyleSheet.create({
  tableListText: {
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  tableHeaderContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    //marginHorizontal: 10,
    backgroundColor: '#cacaca',
    borderTopColor: COLORS.black,
    borderTopWidth: 0.4,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.4,
  },
  depotParcelContainer: {
    width: '30%',
    // borderRightColor: COLORS.black,
    // borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderLeftColor: COLORS.black,
    borderLeftWidth: 0.4,
  },
  depotContainer: {
    width: '22%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    borderLeftColor: COLORS.black,
    borderLeftWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parcelContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  totalContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 11,
    paddingVertical: 5,
  },
  rowDevider: {
    height: 1,
    backgroundColor: COLORS.lightGreyBorder,
    width: '100%',
  },
  tableDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.4,
  },
});
