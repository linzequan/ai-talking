from flask import Flask, request, jsonify
from tongyi_helper import *

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello world"

@app.route("/chat/simple", methods=['POST'])
def simple_chat():
    txt = request.form.get('txt', '')
    if(txt == ''):
        return jsonify({
            "status": -1,
            "message": "入参非法"
        })
    response = call_with_messages(txt)
    print(response)
    return response
    # if response.status_code == HTTPStatus.OK:
    #     return jsonify({
    #         "status": 0,
    #         "message": "查询成功",
    #         "data": {
    #             "message": response.output.choices[0]['message']['content']
    #         }
    #     })
    # else:
    #     return jsonify({
    #         "status": -1,
    #         "message": ('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
    #             response.request_id, response.status_code,
    #             response.code, response.message
    #         ))
    #     })

@app.route("/chat/ai", methods=['POST'])
def ai_chat():
    imgfile = request.form.get('imgfile', '')
    if(imgfile == ''):
        return jsonify({
            "status": -1,
            "message": "入参非法"
        })
    # "file:///Users/linzequan/work/priv/work/ai-talking/model-server/image3.png"
    response = simple_multimodal_conversation_call(imgfile)
    if response.status_code == HTTPStatus.OK:
        return jsonify({
            "status": 0,
            "message": "查询成功",
            "data": {
                "message": response.output.choices[0]['message']['content'][0]['text']
            }
        })
    else:
        return jsonify({
            "status": -1,
            "message": ('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
                response.request_id, response.status_code,
                response.code, response.message
            ))
        })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False)