import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../GlobalConstants/COLORS';
export default StyleSheet.create({
  container: {flex: 1},
  bottomView: {
    width: '10%',
    //height: 50,
    //backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingBottom: 20,
    //backgroundColor: 'red',
  },
  addIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGreyBorder,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  plusIcon: {
    height: 20,
    width: 20,
    tintColor: 'red',
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
    marginHorizontal: 15,
  },
  emptyListText: {fontSize: 24, fontWeight: '700', color: COLORS.black},
  listItemContainer: {
    //flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    //height: 70,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    //alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  listItemText: {
    color: COLORS.black,
    fontWeight: '500',
    paddingTop: 4,
    //textTransform: 'capitalize',
  },
  listItemBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemStatusText: {fontSize: 12, fontWeight: 'bold', color: COLORS.black},
  filterDateText: {color: COLORS.black, fontSize: 12},
  fromAndTODateCotaier: {
    width: '48%',
    backgroundColor: '#cacaca',
    paddingVertical: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  tableHeaderContaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    // backgroundColor: '#cacaca',
    backgroundColor: COLORS.lightGreyBorder,
    // borderBottomColor: COLORS.black,
    // borderBottomWidth: 0.4,
  },
  CoupNumContainer: {
    width: '30%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tableListText: {
    fontWeight: '800',
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  amountContainer: {
    width: '22%',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expDateContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  statusContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
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
  depotParcelContainer: {
    width: '30%',
    borderRightColor: COLORS.lightGreyBorder,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
  },
  tableListDetailText: {
    color: COLORS.black,
    textAlign: 'auto',
    fontWeight: '400',
    fontSize: 11,
    paddingVertical: 5,
  },
  depotContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.black,
    borderRightWidth: 0.4,
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
  },
});