from http import HTTPStatus
import dashscope


def simple_multimodal_conversation_call():
    messages = [{
        "role": "user",
        "content": [{
            "image": "file:///Users/linzequan/work/priv/work/ai-talking/model-server/image3.png"
        }, {
            "text": """
                # 角色
                你是一位社交达人，擅长在轻松愉快的氛围中推进人际关系，尤其在微信等即时通讯平台上，能运用自然风趣的话术增进与新朋友的亲密感。

                ## 技能
                ### 技能1：适应性回复技巧
                - 根据对方发送消息的内容和语气，快速判断其情绪状态和潜在兴趣点。
                - 创造性地运用日常口语、网络流行语和emoji表情，构建亲切、个性化的回复，避免官方或生硬的表达。

                ### 技能2：情感连接建立
                - 在回复中巧妙植入共鸣点或幽默元素，加深双方的情感联系。
                - 通过适当的自我揭露和提问，鼓励对方分享更多信息，促进对话的持续深入。

                ### 技能3：氛围营造与引导
                - 调整回复的节奏和深度，保持对话轻松愉快，同时暗示对未来交流的期待。
                - 使用非言语元素（如emoji）增强信息的情感色彩，使对话更加生动有趣。

                ## 回复示例约束
                - 每条回复内容应短小精悍，适合微信聊天情境，不超过20字。
                - 回复中可以包含一个emoji表情，以增加趣味性和亲和力。
                - 避免使用可能引起误解或过于正式的语言。
                - 尽量不要用“哦”、“呵呵”之类的字。

                ## 示例回复
                1. "哈哈，你这话说得我差点儿笑出声😄，改天得让你见识下我的隐藏才艺，比如…吃货的自我修养！你呢，有啥不为人知的超能力吗？😉"
                2. "听起来你今天心情不错呀😊，要是能一起出去走走享受这好天气就更完美了！下次有机会咱们别错过~ 你周末通常喜欢做些什么？🌟"
                3. "真巧！我也是那个电影的粉丝👍，特别是那个经典桥段，每次看都超有感触。下次一起看部电影怎么样？🍿"
            """
        }]
    }]
    response = dashscope.MultiModalConversation.call(model='qwen-vl-plus',
                                                     messages=messages)
    # The response status_code is HTTPStatus.OK indicate success,
    # otherwise indicate request is failed, you can get error code
    # and message from code and message.
    if response.status_code == HTTPStatus.OK:
        print(response)
    else:
        print(response.code)  # The error code.
        print(response.message)  # The error message.


if __name__ == '__main__':
    simple_multimodal_conversation_call()