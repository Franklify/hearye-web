
var Headline = React.createClass({
  render: function() {
    return(
      <h1>HearYe</h1>
    );
  }
});
var Subheading = React.createClass({
  render: function() {
    return(
      <h2>The digital bulletin board for university events.</h2>
    );
  }
});
var BodyText = React.createClass({
  render: function() {
    return(
      <p>Say goodbye to word of mouth, and say hello to the new town crier.</p>
    );
  }
});
var UpdateButton = React.createClass({
  render: function() {
    var updateBtn = "update-btn";
    return(
      <a href="#" className={updateBtn}>Get involved</a>
    );
  }
});

ReactDOM.render(
<div>
  <Headline/>
  <Subheading />
  <BodyText />
  <UpdateButton />
</div>,

document.getElementById("desc"));

var ListItem = React.createClass({
  getInitialState: function() {
    return{ data: [] };
  },
  render: function() {
    var feedItem = "feed-item",
    itemDate = "item-date",
    itemAuthor = "item-author",
    itemDesc = "item-description",
    itemPrice = "item-price",
    itemLoc = "item-location",
    itemInfo = "item-info",
    itemCom = "item-comments",
    itemAttend = "item-attending",
    itemOverlay = "item-overlay";

    return(
      <li className={feedItem}>
        <h3>{this.props.event}</h3>
        <h6 className={itemDate}>{this.props.date}</h6>
        <h4 className={itemAuthor}>by {this.props.author}</h4>
        <p className={itemDesc}><span className={itemPrice}>{this.props.price}</span> &#8226; <span className={itemLoc}>{this.props.location}</span>  &#8226; {this.props.children}</p>
        <div className={itemOverlay}><p className={itemInfo}><span className={itemCom}>{this.props.comments} comments</span><span className={itemAttend}>{this.props.attending} attending</span></p></div>
      </li>
    );
  }
});

var Feed = React.createClass({
  getInitialState: function() {
    const DATABASE_URL = "https://hearye-landing.firebaseio.com/";
    var db = new Firebase(DATABASE_URL);
    this.eventRef = db.child("events");
    return {data: []};
  },
  loadEvents: function() {
    this.eventRef.once("value", function(snapshot) {
      var i = 0;
      snapshot.forEach(function(childSnapshot) {
         console.log(childSnapshot.val());
      });
    });
  },
  componentDidMount: function() {

    this.loadEvents();
    setInterval(this.loadEvents, this.props.pollInterval);
  },
  render: function() {
    return(
      <div>
        <ListItem event="DesignWorks Recruitment" date="Jan 11" author="DesignWorks" price="Free" location="Norris Center" comments="12" attending="42">We are looking for designers and developers for this upcoming quarter. Apply now!</ListItem>
        <ListItem event="Decorate a Donut" date="Jan 14" author="ASG" price="$5" location="Norris Ground Floor" comments="20" attending="67">Decorate a donut at the food court on the ground floor of Norris.</ListItem>
        <ListItem event="Interstellar Screening" date="Jan 20" author="Movie Club" price="$2" location="Tech LR2" comments="45" attending="101">Watch Interstellar, the critically acclaimed Sci-Fi thriller!</ListItem>
        <ListItem event="Cookies 4 a Cure" date="Jan 21" author="DU Top Haus" price="$3" location="Lisa's Cafe" comments="34" attending="50">Purchase baked goods and we will donate some of the money to St. Judes Children Hospital.</ListItem>
        <ListItem event="Kids to Campus" date="Jan 21" author="Supplies for Dreams" price="Free" location="The Arch" comments="5" attending="13">Welcome back to 8th grade! </ListItem>
        <ListItem event="APAC Potluck" date="Jan 22" author="APAC" price="Free" location="1800 Sherman Ave" comments="10" attending="15">Enjoy APAC annual potluck. Be sure to bring some Asian cuisine.</ListItem>
        <ListItem event="Usercentric Launch Party" date="Jan 20" author="Usercentric" price="Free" location="The Garage" comments="11" attending="21">Usercentric is launching and we are inviting you to come celebrate it with us @ the Garage.</ListItem>
        <ListItem event="Boba Fundraiser" date="Jan 21" author="TASC" price="$5" location="Kung Fu Tea" comments="22" attending="15">Come to Kung Fu tea in Evanston to support TASC in 2016!</ListItem>
      </div>
    );
  }
});

ReactDOM.render(
  <Feed pollInterval={5000}></Feed>,
  document.getElementById("feed-list")
);
