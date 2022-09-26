import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";

export default class NLG extends React.Component {
  constructor(props) {
    super(props);

    this.apiURL = "https://hf.space/embed/ai4bharat/IndicNLG/+/api/predict/";

    this.state = {
      languageChoice: "Hindi",
      task: "IndicSentenceSummarization",
      transliteratedText: "",
      generatedText: "",
    };

    this.languages = {
      hi: ["Hindi - हिंदी", "Hindi"],
      mr: ["Marathi - मराठी", "Marathi"],
      as: ["Assamese - অসমীয়া", "Assamese"],
      gu: ["Gujarati - ગુજરાતી", "Gujarati"],
      kn: ["Kannada - ಕನ್ನಡ", "Kannada"],
      ml: ["Malayalam - മലയാളം", "Malayalam"],
      or: ["Oriya - ଓଡ଼ିଆ", "Odia"],
      pa: ["Punjabi - ਪੰਜਾਬੀ", "Punjabi"],
      ta: ["Tamil - தமிழ்", "Tamil"],
      te: ["Telugu - తెలుగు", "Telugu"],
      bn: ["Bangla - বাংলা", "Bengali"],
    };

    this.tasks = [
      "IndicWikiBio",
      "IndicHeadlineGeneration",
      "IndicParaphrasing",
      "IndicSentenceSummarization",
      "IndicQuestionGeneration",
    ];

    this.sortedLanguages = {};
  }

  componentWillMount() {
    const _this = this;
    const languages = Object.keys(_this.languages);
    languages.sort();
    languages.forEach((key) => {
      _this.sortedLanguages[key] = _this.languages[key];
    });
  }

  getGeneratedText() {
    const _this = this;
    fetch(_this.apiURL, {
      method: "POST",
      body: JSON.stringify({
        data: [
          _this.state.transliteratedText,
          _this.state.task,
          _this.state.languageChoice,
        ],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        _this.setState({ generatedText: json_response.data[0] });
      });
  }

  render() {
    return (
      <div>
        <section className="title-section">
          <h1 className="title">
            <img
              className="a4b-logo"
              alt="a4blogo"
              width={50}
              height={50}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Indic Natural Language Generation (NLG)
          </h1>
          <p className="subtitle">
            Generate text in real-time across various Indian Languages.
          </p>
        </section>
        <hr className="hr-split" />
        <div className="common-options">
          <label className="a4b-option">
            Language:
            <Select
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
              value={this.state.languageChoice}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });
              }}
            >
              {Object.entries(this.sortedLanguages).map(
                ([language, optionText]) => {
                  return (
                    <MenuItem sx={{ margin: 1 }} value={optionText[1]}>
                      {optionText[0]}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </label>
          <label className="a4b-option">
            Task:
            <Select
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
              value={this.state.task}
              onChange={(e) => {
                this.setState({ task: e.target.value });
              }}
            >
              {this.tasks.map((task) => {
                return (
                  <MenuItem sx={{ margin: 1 }} value={task}>
                    {task}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
        </div>
        <div className="a4b-interface">
          <div className="a4b-output">
            <div className="a4b-output">
              <div className="a4b-transliterate-container">
                <IndicTransliterate
                  className="a4b-transliterate-text"
                  renderComponent={(props) => <textarea {...props} />}
                  value={this.state.transliteratedText}
                  placeholder="Type your text here...."
                  onChangeText={(text) => {
                    this.setState({ transliteratedText: text });
                  }}
                  lang={this.state.languageChoice}
                />
              </div>
            </div>
            <div className="a4b-nmt-buttons">
              <Button
                onClick={() => {
                  this.getGeneratedText();
                }}
                sx={{
                  backgroundColor: "#f06b42",
                  borderRadius: 15,
                  padding: "15px 32px",
                  ":hover": { backgroundColor: "#f06b42" },
                  margin: 2.5,
                }}
                variant="contained"
              >
                Generate
              </Button>
              <Button
                sx={{
                  width: 10,
                  height: 50,
                  color: "#4a4a4a",
                  borderColor: "#4a4a4a",
                }}
                size="large"
                variant="outlined"
                onClick={() => {
                  if (this.state.generatedText) {
                    navigator.clipboard.writeText(this.state.generatedText);
                  }
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
            <textarea
              value={this.state.generatedText}
              placeholder="View Generated Text here....."
              className="a4b-transliterate-text"
            />
          </div>
        </div>
      </div>
    );
  }
}
