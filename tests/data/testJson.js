const testCases = [
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },

    },
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
]

const additionalTestCases = [
    {
        name: 'python : infinite loop with input',
        reqObject: {
            language: 'python',
            script:
                'while True:\n' +
                '    try:\n' +
                '        x = int(input("Enter a number: "))\n' +
                '        print("You entered:", x)\n' +
                '    except ValueError:\n' +
                '        print("Invalid input, please enter a number.")\n',
            stdin: 'abc\n1\n2\n3\n',
        },
        expectedResponse: {
            val: 'Invalid input, please enter a number.\n1\nYou entered: 2\nYou entered: 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : invalid input handling',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (true) {\n' +
                '            try {\n' +
                '                int number = scanner.nextInt();\n' +
                '                System.out.println("You entered: " + number);\n' +
                '            } catch (Exception e) {\n' +
                '                System.out.println("Invalid input, please enter a number.");\n' +
                '                scanner.nextLine(); // Clear buffer\n' +
                '            }\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
            stdin: 'abc\n1\n2\n3\n',
        },
        expectedResponse: {
            val: 'Invalid input, please enter a number.\nYou entered: 1\nYou entered: 2\nYou entered: 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : handle file input',
        reqObject: {
            language: 'ruby',
            script:
                'File.open("input.txt", "r") do |file|\n' +
                '    while line = file.gets\n' +
                '        puts line\n' +
                '    end\n' +
                'end\n',
            stdin: '', // Simulate file input via another mechanism
        },
        expectedResponse: {
            val: 'File contents here\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : handle large output',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    for(int i=0; i<100000; i++) {\n' +
                '        cout << i << " "; // Print large output\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: '0 1 2 3 4 5 6 7 8 9 ...', // Example truncated for brevity
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : handle asynchronous operations',
        reqObject: {
            language: 'nodejs',
            script:
                'setTimeout(() => {\n' +
                '    console.log("Delayed output");\n' +
                '}, 1000);\n' +
                'console.log("Immediate output");\n',
        },
        expectedResponse: {
            val: 'Immediate output\nDelayed output\n',
            status: 200,
            error: 0,
        },
    },
];
const additionalTestCases2 = [
    {
        name: 'go : hello world',
        reqObject: {
            language: 'go',
            script: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("hello world")\n}',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'go : print stdin',
        reqObject: {
            language: 'go',
            script: 'package main\nimport "fmt"\nfunc main() {\n    var input int\n    fmt.Scan(&input)\n    fmt.Println(input)\n}',
            stdin: '42',
        },
        expectedResponse: {
            val: '42\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'swift : hello world',
        reqObject: {
            language: 'swift',
            script: 'print("hello world")',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'swift : print stdin',
        reqObject: {
            language: 'swift',
            script: 'if let input = readLine() {\n    print(input)\n}',
            stdin: '42',
        },
        expectedResponse: {
            val: '42\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'rust : hello world',
        reqObject: {
            language: 'rust',
            script: 'fn main() {\n    println!("hello world");\n}',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'rust : print stdin',
        reqObject: {
            language: 'rust',
            script: 'use std::io;\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_line(&mut input).expect("Failed to read line");\n    println!("{}", input.trim());\n}',
            stdin: '42',
        },
        expectedResponse: {
            val: '42\n',
            status: 200,
            error: 0,
        },
    },
];

module.exports = { testCases: [...testCases, ...additionalTestCases,...additionalTestCases2] };

