import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  LayoutAnimation,
  Platform,
} from 'react-native';
import styles from './styles';
import images from '../../Image';
import moment from 'moment';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../GlobalConstants/COLORS';
import CustomDropdown from '../../comonent/CustomDropdown';
import AppLoader from '../../Helper/AppIndicator';
import CalenderComp from '../../comonent/CalenderComp';

const TODAY_DATE = moment().format('DD-MM-YYYY');

// console.log('Todays Day', moment().isoWeekday());

const SupplyCopy = ({navigation}) => {
  const [depotArr, setDepotArr] = useState([]);
  const [depotItem, setDepotItem] = useState('');
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState('');
  const [showCalender, setshowCalender] = useState(false);
  const [selectFromDate, setselectFromDate] = useState(false);
  const [selectedFromDate, setselectedFromDate] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );

  const [passFromDateToApi, setpassFromDateToApi] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [selectedToDate, setselectedToDate] = useState(
    moment(new Date()).format('DD-MM-YYYY, dddd'),
  );

  const [passToDateToApi, setpassToDateToApi] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const [dateType, setdateType] = useState('');

  const [publicationList, setpublicationList] = useState([]);

  useEffect(() => {
    depotApi();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData1 = await AsyncStorage.getItem('InExUserDetails');
    const userData = JSON.parse(userData1);
    setuserData(userData);
  };

  const apiFailureAlertMessage = (title, message, type) => {
    console.log('Failure Api Name =======> ', apiName);
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            // setSupplyVal(0);
            // setnewSupply(0);
            // setDisableButton(true);
          },
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    getTodayTradeSupply();
  }, [depotItem, userData]);

  const getTodayTradeSupply = async () => {
    //setloading(true);
    const userId = await AsyncStorage.getItem('InExUserId');
    if (userData && depotItem) {
      //console.log('depotItem', depotItem);
      const token = await AsyncStorage.getItem('InExToken');
      const response = await auth.getTodayTradeSupplyCopy(
        `${depotItem?.ship_to_code}`,
        token,
      );
      console.log('getTodayTradeSupply', response);
      setloading(false);

      // console.log('getTodayTradeSupply', userData);
      // console.log('getTodayTradeSupply', depotItem);

      if (response?.data?.code == 200) {
        setpublicationList(response?.data?.data);
      } else {
        Alert.alert(
          'Oops!',
          'something went wrong, please try later!',
          [
            {
              text: 'OK',
              onPress: async () => {
                // await AsyncStorage.removeItem('InExToken');
                // await AsyncStorage.removeItem('InExUserId');
                // await AsyncStorage.removeItem('InExUserDetails');
                // NavigationService.reset(navigation, 'Login');
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  const depotApi = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');
    const response = await auth.depots(userId, token);
    if (response?.status != 200 && response?.status != 404) {
      apiFailureAlertMessage(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        'depotApi',
      );
    } else if (response?.status == 404) {
      apiFailureAlertMessage(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        'depotApi',
      );
    } else {
      setDepotArr(response.data?.data);
      setDepotItem(response.data?.data[0]);
    }
  };

  const rowItemView = item => {
    return (
      <View
        style={[
          {
            flexDirection: 'column',
            marginTop: 15,
            //marginHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 10,
          },
        ]}>
        <View>
          <Text numberOfLines={2} style={{fontSize: 18, fontWeight: 'bold'}}>
            {item?.trade_name}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
          }}>
          <TextInput
            style={styles.textInputStyle}
            value={item?.updated_value.toString()}
            keyboardType={'numeric' || 'number-pad'}
            onChangeText={text => onChangeTextValue(text, item)}
          />
        </View>
      </View>
    );
  };

  const onChangeTextValue = (text, item) => {
    if (text == '') {
      let newArr = publicationList.map(rederItem => {
        if (rederItem?.id == item?.id) {
          rederItem.updated_value = 0;
          rederItem.difference = item.updated_value - item?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });
      setpublicationList(newArr);
    } else {
      let newArr = publicationList.map(rederItem => {
        if (rederItem?.id == item?.id) {
          let newValue = parseInt(text);
          rederItem.updated_value = newValue;
          rederItem.difference = item.updated_value - item?.trade;
          return {...rederItem};
        } else {
          return rederItem;
        }
      });
      setpublicationList(newArr);
    }
  };

  const submitAction = async () => {
    const token = await AsyncStorage.getItem('InExToken');
    const userId = await AsyncStorage.getItem('InExUserId');

    if (
      passFromDateToApi == 'Please select date...' ||
      passToDateToApi == 'Please select date...'
    ) {
      Alert.alert(
        'Oops!',
        'Please select from and to date.',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );

      return;
    }

    setloading(true);

    let dataObj = {
      user_id: depotItem?.ship_to_code,
      total_updated_data: publicationList,
      from_date: passFromDateToApi,
      to_date: passToDateToApi,
      //date_type: 'weekday',
    };

    console.log('submitAction', dataObj);

    let response = await auth.saveSamplingCopy(dataObj, token);
    setloading(false);

    console.log('submitAction', response);

    if (response?.data?.code == 200 || response?.data?.code == 201) {
      Alert.alert(
        'Success',
        'Sampling copy Added successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate('SamplingCopyList');
              }, 1000);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      setloading(false);
      Alert.alert(
        'Oops!',
        response.data?.message ? response.data?.message : response?.problem,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <>
      <ScrollView>
        <AppLoader visible={loading} />
        {showCalender ? (
          <CalenderComp
            selectFromDate={selectFromDate}
            dateType={dateType}
            fromDate={selectedFromDate}
            closeModal={() => {
              setshowCalender(!showCalender);
              setselectFromDate(false);
            }}
            minDate={moment(new Date()).format('YYYY-MM-DD')}
            setselectedDate={date => {
              //console.log('SelectedDate', date);
              const reqFormatDt = moment(date).format('DD-MM-YYYY, dddd');
              setshowCalender(!showCalender);
              if (dateType == 'FD') {
                if (date <= passToDateToApi) {
                  setselectedFromDate(reqFormatDt);
                  setpassFromDateToApi(date);
                } else {
                  Alert.alert(
                    'Oops',
                    'From date should be less than to date.',
                    [{text: 'OK', onPress: async () => {}}],
                    {cancelable: false},
                  );
                }

                // if (reqFormatDt <= selectedToDate) {
                //   setselectedFromDate(reqFormatDt);
                //   setpassFromDateToApi(date);
                // } else {
                //   Alert.alert(
                //     'Oops',
                //     'From date should be less than to date.',
                //     [{text: 'OK', onPress: async () => {}}],
                //     {cancelable: false},
                //   );
                // }
              } else if (dateType == 'TD') {
                // if (reqFormatDt < selectedFromDate) {
                //   Alert.alert(
                //     'Oops',
                //     'To date should be greater than from date.',
                //     [{text: 'OK', onPress: async () => {}}],
                //     {cancelable: false},
                //   );
                // } else {
                //   setselectedToDate(reqFormatDt);
                //   setpassToDateToApi(date);
                // }

                if (date < passFromDateToApi) {
                  Alert.alert(
                    'Oops',
                    'To date should be greater than from date.',
                    [{text: 'OK', onPress: async () => {}}],
                    {cancelable: false},
                  );
                } else {
                  setselectedToDate(reqFormatDt);
                  setpassToDateToApi(date);
                }
              } else {
              }
            }}
          />
        ) : null}
        <View style={styles.container}>
          <CustomDropdown
            headerTitle="Depot Name"
            data={depotArr}
            selectedItem={depotItem?.name}
            itemHandler={item => {
              setDepotItem(item);
            }}
            search={true}
            disable={
              userData?.role == 'Depot Salesman' ||
              userData?.role == 'Parcel Vendor'
                ? true
                : false
            }
          />

          <View
            style={{
              backgroundColor: 'white',
              marginTop: 20,
            }}>
            <Text style={styles.dropdownHeading}>From Date</Text>
            <TouchableOpacity
              onPress={() => {
                setshowCalender(true);
                setdateType('FD');
              }}
              style={{
                height: 46,
                width: '100%',
                backgroundColor: 'lightgrey',
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                {selectedFromDate}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 20,
            }}>
            <Text style={styles.dropdownHeading}>To Date</Text>
            <TouchableOpacity
              onPress={() => {
                setshowCalender(true);
                setdateType('TD');
              }}
              style={{
                height: 46,
                width: '100%',
                backgroundColor: 'lightgrey',
                paddingHorizontal: 16,
                justifyContent: 'center',
              }}>
              <Text style={{color: COLORS.black, fontSize: 16}}>
                {selectedToDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
            }}>
            {publicationList?.length > 0 ? (
              publicationList.map(item => {
                return <View key={item?.trade_name}>{rowItemView(item)}</View>;
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                  Supply list not found
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttongroup}>
            <View>
              <TouchableOpacity
                disabled={publicationList.length > 0 ? false : true}
                onPress={() => {
                  submitAction();
                }}>
                <View
                  style={[
                    styles.canclebtn,
                    {
                      opacity: publicationList.length > 0 ? 1 : 0.3,
                      borderColor: '#DA0B0B',
                      backgroundColor: 'white',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.canclebtntext,
                      {
                        color: '#DA0B0B',
                      },
                    ]}>
                    SUBMIT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SamplingCopyList');
          }}
          style={styles.addIconContainer}>
          <Image style={styles.plusIcon} source={images.file} />
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default SupplyCopy;
