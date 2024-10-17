import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../GlobalConstants/COLORS';

export default function VendorDashboard({data, userData}) {
  return (
    <>
      {/* <View>
        <Text style={styles.divisionName}>Division: {userData?.name}</Text>
      </View> */}
      <View style={styles.tableContainer}>
        <View style={[styles.tableHeaderContaier]}>
          <View
            style={[
              styles.depotContainer,
              {
                borderLeftColor: COLORS.black,
                borderLeftWidth: 0.4,
              },
            ]}>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.tableListText}>Total</Text>
              <Text style={styles.tableListText}>OutStanding</Text>
            </View>
          </View>
          <View style={styles.parcelContainer}>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.tableListText}>Payment</Text>
              <Text style={styles.tableListText}>Sent</Text>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.tableListText}>Accepted</Text>
              <Text style={styles.tableListText}>Coupon</Text>
            </View>
          </View>
          <View style={styles.parcelContainer}>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.tableListText}>Rejected</Text>
              <Text style={styles.tableListText}>Coupon</Text>
            </View>
          </View>
        </View>
        {data ? (
          <View>
            {/* <View style={styles.rowDevider}></View> */}
            <View style={styles.tableDetailContainer}>
              <View
                style={[
                  styles.depotParcelContainer,
                  {
                    borderLeftColor: COLORS.black,
                    borderLeftWidth: 0.4,
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 0.4,
                    // borderTopColor: COLORS.black,
                    // borderTopWidth: 0.4,
                  },
                ]}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {data?.outstanding ? data?.outstanding : 0}
                </Text>
              </View>
              <View
                style={[
                  styles.depotContainer,
                  {
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 0.4,
                  },
                ]}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {data?.paymentSent ? data?.paymentSent : 0}
                </Text>
              </View>
              <View
                style={[
                  styles.parcelContainer,
                  {
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 0.4,
                  },
                ]}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {data?.accepted_coupon ? data?.accepted_coupon : 0}
                </Text>
              </View>
              <View
                style={[
                  styles.totalContainer,
                  {
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 0.4,
                  },
                ]}>
                <Text
                  style={[styles.tableListDetailText, {textAlign: 'center'}]}>
                  {data?.rejected_coupon ? data?.rejected_coupon : 0}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              borderColor: COLORS.black,
              borderWidth: 0.4,
              borderTopColor: 'transparent',
            }}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 15,
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Data is empty.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tableListText: {
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    //marginTop: 10,
    //paddingVertical: 5,
  },
  tableContainer: {
    //marginTop: 20,
    backgroundColor: 'white',
  },
  tableHeaderContaier: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //height: 40,
    //marginHorizontal: 10,
    backgroundColor: COLORS.lightGreyBorder,
    borderToptColor: COLORS.black,
    borderTopWidth: 0.4,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.4,
  },
  depotParcelContainer: {
    width: '25%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  depotContainer: {
    width: '25%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    // borderToptColor: COLORS.black,
    // borderTopWidth: 0.4,
  },
  parcelContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    // borderToptColor: COLORS.black,
    // borderTopWidth: 0.4,
  },
  totalContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    // borderToptColor: COLORS.black,
    // borderTopWidth: 0.4,
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'auto',
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
    //paddingTop: 10,
    //paddingHorizontal: 10,
    //height: 40,
  },
  divisionName: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerHeadingContainer: {paddingVertical: 5},
});
