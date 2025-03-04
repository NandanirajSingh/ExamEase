import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

function QuestionForm({ question, updateQuestion, removeQuestion, darkMode }) {
  const handleTypeChange = (e) => {
    const type = e.target.value;
    const updatedQuestion = { ...question, type };
    if (type === "MCQ") {
      updatedQuestion.options = [
        { id: "option-1", text: "" },
        { id: "option-2", text: "" },
        { id: "option-3", text: "" },
        { id: "option-4", text: "" },
      ];
      updatedQuestion.correctAnswer = [];
    } else if (type === "Checkbox" || type === "Radio") {
      updatedQuestion.options = [
        { id: "option-1", text: "" },
        { id: "option-2", text: "" },
      ];
      updatedQuestion.correctAnswer = [];
    } else {
      updatedQuestion.options = [];
      updatedQuestion.correctAnswer = [];
    }
    updateQuestion(updatedQuestion);
  };

  const addOption = () => {
    if (question.options.length < 10) {
      const newOption = { id: `option-${question.options.length + 1}`, text: "" };
      updateQuestion({ ...question, options: [...question.options, newOption] });
    }
  };

  const removeOption = (id) => {
    if (question.options.length > 2) {
      updateQuestion({
        ...question,
        options: question.options.filter((option) => option.id !== id),
        correctAnswer: question.correctAnswer.filter((answer) => answer !== id),
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <select
            value={question.type}
            onChange={handleTypeChange}
            className="w-full md:w-[200px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:text-white"
          >
            <option value="">Select question type</option>
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="Checkbox">Multiple Select</option>
            <option value="Radio">Single Select</option>
            <option value="ShortAnswer">Short Answer</option>
            <option value="LengthyAnswer">Essay Answer</option>
          </select>
        </div>
        <button
          type="button"
          onClick={removeQuestion}
          className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Remove Question</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Question Text:
          </label>
          <textarea
            value={question.text}
            onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 resize-none transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="Enter your question here..."
          />
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Marks:
          </label>
          <input
            type="number"
            value={question.marks}
            onChange={(e) => updateQuestion({ ...question, marks: Number(e.target.value) })}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {(question.type === "MCQ" || question.type === "Checkbox" || question.type === "Radio") && (
        <div className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-3 group">
                <div className="flex-none">
                  <input
                    type={question.type === "MCQ" || question.type === "Radio" ? "radio" : "checkbox"}
                    checked={question.correctAnswer.includes(option.id)}
                    onChange={(e) => {
                      let newCorrectAnswer;
                      if (question.type === "MCQ" || question.type === "Radio") {
                        newCorrectAnswer = [option.id];
                      } else {
                        newCorrectAnswer = e.target.checked
                          ? [...question.correctAnswer, option.id]
                          : question.correctAnswer.filter((id) => id !== option.id);
                      }
                      updateQuestion({ ...question, correctAnswer: newCorrectAnswer });
                    }}
                    className="w-4 h-4 text-[#122064] dark:text-blue-500 focus:ring-[#122064] dark:focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index].text = e.target.value;
                    updateQuestion({ ...question, options: newOptions });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
               </div>
            ))}
          </div>
          {question.options.length < 10 && (
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-2 px-4 py-2 text-[#122064] dark:text-blue-500 border border-[#122064] dark:border-blue-500 rounded-lg hover:bg-[#122064] dark:hover:bg-blue-600 hover:text-white transition-colors group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              Add Option
            </button>
          )}
        </div>
      )}

      {question.type === "ShortAnswer" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Word Limit:
          </label>
          <input
            type="number"
            value={question.wordLimit || ""}
            onChange={(e) => updateQuestion({ ...question, wordLimit: Number(e.target.value) })}
            min="1"
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      {question.type === "LengthyAnswer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Word Limit:
            </label>
            <input
              type="number"
              value={question.minWordLimit || ""}
              onChange={(e) => updateQuestion({ ...question, minWordLimit: Number(e.target.value) })}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum Word Limit:
            </label>
            <input
              type="number"
              value={question.maxWordLimit || ""}
              onChange={(e) => updateQuestion({ ...question, maxWordLimit: Number(e.target.value) })}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#122064] dark:focus:ring-blue-500 transition-all duration-200 hover:border-[#122064] dark:hover:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionForm;